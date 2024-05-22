import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';

import {Colors} from '~theme';
import Network from '~components/Network';
import Navigation from '~navigator';
import ModalCheckVersion from '~shared/components/Modals/ModalCheckVersion';

const Index = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      <Network />
      <Navigation />
      <ModalCheckVersion />
      <FlashMessage position="center" floating={true} />
    </SafeAreaView>
  );
};
export default Index;
