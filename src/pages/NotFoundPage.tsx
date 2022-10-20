import { Center, Heading, Text, VStack } from '@chakra-ui/react';
import PageContainer from '../components/layout/PageContainer';

interface Props {
  status?: number;
}

const errorMessages: any = {
  404: 'Page not found',
  401: 'You are not authorized to view this page',
};

const ErrorPage: React.FC<Props> = ({ status = 0 }) => {
  const message = errorMessages[status] ?? 'Unknown error';

  return (
    <PageContainer>
      <Center boxSize="100%" py="140px" px={10}>
        <VStack alignItems="flex-start" spacing={4}>
          <Heading size="lg" color="red.500" fontWeight="extrabold">
            {status && status}
          </Heading>
          <Heading size="md">{message}</Heading>
        </VStack>
      </Center>
    </PageContainer>
  );
};
export default ErrorPage;
