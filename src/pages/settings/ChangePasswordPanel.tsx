import { Center, Spinner } from '@chakra-ui/react';
import { useGetAccountDataQuery } from '../../store/account-api';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordPanel: React.FC = () => {
  const { currentData, isLoading } = useGetAccountDataQuery();

  if (isLoading)
    return (
      <Center height="100%">
        <Spinner />
      </Center>
    );

  return <ChangePasswordForm />;
};
export default ChangePasswordPanel;
