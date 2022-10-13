import { useEffect, useState } from 'react';
import { useGetAccountDataQuery } from '../store/account-api';

let contacts: string[] = [];

const subscribers: ((newValue: string[]) => void)[] = [];

const emit = (newValue: string[]) =>
  subscribers.forEach((sub) => sub(newValue));

const actions = {
  addContacts: (newContactIds: string[]) => {
    console.log('inAddFn', contacts);
    const newContacts: string[] = [];
    newContactIds.forEach((id) => {
      if (contacts.indexOf(id) > -1) return;
      newContacts.push(id);
    });
    return [...newContacts, ...contacts];
  },
  replaceContacts: (newContacts: string[]) => newContacts,
};

const dispatch = <T extends (arg0: K) => typeof contacts, K>(
  action: T,
  payload: K
) => {
  contacts = action(payload);
  emit(contacts);
};

const useContacts = () => {
  const setContacts = useState<string[]>(contacts)[1];
  const { currentData, isLoading, isFetching, isError, isUninitialized } =
    useGetAccountDataQuery();

  useEffect(() => {
    const subscription = setContacts;
    console.log('new subscription');
    subscribers.push(subscription);
    return () => {
      subscribers.splice(subscribers.indexOf(subscription), 1);
    };
  }, [setContacts]);

  useEffect(() => {
    if (currentData) {
      const newContacts = currentData.contacts ?? [];
      console.log('received api', newContacts);
      dispatch(actions.addContacts, newContacts);
    }
  }, [currentData, isUninitialized]);

  return {
    contacts,
    isLoading,
    isFetching,
    isError,
    addContacts: (newContactIds: string[]) =>
      dispatch(actions.addContacts, newContactIds),
  };
};

export default useContacts;
