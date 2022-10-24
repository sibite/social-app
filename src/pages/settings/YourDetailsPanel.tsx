import { Center, Spinner } from '@chakra-ui/react';
import { useGetAccountDataQuery } from '../../store/account-api';
import YourDetailsForm from './YourDetailsForm';

const YourDetailsPanel: React.FC = () => {
  const { currentData, isLoading } = useGetAccountDataQuery();

  if (isLoading)
    return (
      <Center height="100%">
        <Spinner />
      </Center>
    );

  return <YourDetailsForm />;
};
export default YourDetailsPanel;
