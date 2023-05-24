import {Screen} from '@components/Screen';
import {Text} from '@components/Text';

const ProfileScreen = () => {
  return (
    <Screen>
      <Screen.Body mx="$s-5" flex={1} jc="center" ai="center">
        <Text>(This is hardcoded text)</Text>
        <Text mt="$vs-3" textAlign="center">
          The idea of this boilerplate is to provide the setup out of box, no
          magic and easy to customize.
        </Text>
        <Text mt="$vs-5" fontWeight="600">
          More magic, more headache.
        </Text>
      </Screen.Body>
    </Screen>
  );
};

export default ProfileScreen;
