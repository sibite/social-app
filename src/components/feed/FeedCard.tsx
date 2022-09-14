import { ChatIcon, HamburgerIcon, LinkIcon, StarIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import Card from '../chakra-ui/Card';

const FeedCard: React.FC = () => (
  <Card>
    <VStack spacing={4} p={4} align="stretch">
      <Flex align="center" gap={2}>
        <Avatar name="User" />
        <VStack align="flex-start" flexGrow={1} spacing={0}>
          <Heading as="span" size="sm">
            User Name
          </Heading>
          <Text opacity={0.6} fontSize="sm">
            Yesterday at 15:48
          </Text>
        </VStack>
        <IconButton
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="ghost"
        />
      </Flex>
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat, enim
        necessitatibus odit asperiores quae fugit, laboriosam, nisi eum ratione
        incidunt repudiandae expedita totam reprehenderit delectus consequatur
        temporibus cupiditate. Asperiores, aspernatur. Lorem ipsum dolor, sit
        amet consectetur adipisicing elit. Facere, a?
      </Text>
    </VStack>
    <Image src="https://static01.nyt.com/images/2022/08/12/travel/15Paris-trees2/merlin_207982533_fe11e4be-760d-4959-a156-8db02e7ce5e5-videoSixteenByNine3000.jpg" />
    <Grid templateRows="1fr" templateColumns="repeat(3, 1fr)">
      <Button
        variant="ghost"
        leftIcon={<StarIcon />}
        rightIcon={
          <Badge variant="subtle" colorScheme="blue">
            23
          </Badge>
        }
      >
        Like
      </Button>
      <Button
        variant="ghost"
        leftIcon={<ChatIcon />}
        rightIcon={
          <Badge variant="subtle" colorScheme="blue">
            5
          </Badge>
        }
      >
        Comments
      </Button>
      <Button variant="ghost" leftIcon={<LinkIcon />}>
        Share
      </Button>
    </Grid>
  </Card>
);

export default FeedCard;
