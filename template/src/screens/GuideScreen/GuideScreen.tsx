import {Screen} from '@components/Screen';
import {RootStackScreenProps} from '@navigation/types';
import Markdown from 'react-native-markdown-display';
import guides from './guides';
import Routes from '@navigation/routes';

const GuideScreen = ({
  navigation,
  route,
}: RootStackScreenProps<typeof Routes.Guide>) => {
  const {topicTx = ''} = route.params;
  return (
    <Screen variant="scroll">
      <Screen.Header titleTx={topicTx} onLeftPress={navigation.goBack} />
      <Screen.Container>
        <Screen.Body px="$s-5" pb="$vs-5">
          <Markdown>{guides[topicTx]}</Markdown>
        </Screen.Body>
      </Screen.Container>
    </Screen>
  );
};

export default GuideScreen;
