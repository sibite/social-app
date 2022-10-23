import { VStack } from '@chakra-ui/react';
import ProfileCardSkeleton from '../../components/profile-card/ProfileCardSkeleton';
import { useGetAccountDataQuery } from '../../store/account-api';
import { useAppSelector } from '../../store/hooks';
import Contact from './Contact';

const Contacts: React.FC = () => {
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const { isFetching } = useGetAccountDataQuery();

  const style = {
    w: 'full',
    h: 'full',
    p: 3,
  };

  if (isFetching)
    return (
      <VStack boxSize="100%" alignItems="stretch" p={4} spacing={6}>
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
      </VStack>
    );

  return (
    <VStack sx={style} overflowY="auto">
      {contacts.map(({ userId, lastMessage }) => (
        <Contact profileId={userId} lastMessage={lastMessage} key={userId} />
      ))}
    </VStack>
  );
};

export default Contacts;
