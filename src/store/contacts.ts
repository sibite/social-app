import { createSlice } from '@reduxjs/toolkit';
import { ContactType } from '../../server/api-types/auth';
import { ServerToClientMessage } from '../../server/chat-socket/socket-types';

interface ContactsState {
  contacts: ContactType[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactsSorter = (a: ContactType, b: ContactType) =>
  b.lastMessage.date - a.lastMessage.date;

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    init(
      state,
      action: {
        type: string;
        payload: ContactType[];
      }
    ) {
      state.contacts = action.payload;
      state.contacts.sort(contactsSorter);
    },
    update(
      state,
      action: {
        type: string;
        payload: { contactId: string; message: ServerToClientMessage };
      }
    ) {
      const { contactId, message } = action.payload;
      const contact = state.contacts.find(({ userId }) => userId === contactId);
      const newContact: ContactType = {
        userId: contactId,
        lastMessage: message,
      };
      if (!contact) state.contacts.unshift(newContact);
      else contact.lastMessage = message;
      state.contacts.sort(contactsSorter);
    },
    clearAll(state) {
      state.contacts = [];
    },
  },
});

const contactsReducer = contactsSlice.reducer;

export const contactsActions = contactsSlice.actions;

export default contactsReducer;
