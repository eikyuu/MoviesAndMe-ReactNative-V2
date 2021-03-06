import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';

const Avatar = ({avatar, dispatch}) => {
  const _avatarClicked = () => {
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const action = {type: 'SET_AVATAR', value: source};
        dispatch(action);
      }
    });
  };

  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={_avatarClicked}>
      <Image style={styles.avatar} source={avatar} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2,
  },
});

const mapStateToProps = (state) => {
  return {
    avatar: state.setAvatar.avatar,
  };
};

export default connect(mapStateToProps)(Avatar);
