import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ToastManager, { Toast } from 'toastify-react-native';
import { colors } from '../constants/Theme';
import * as tagsService from '../utilities/tags-service';
import { capitalizeFirstLetter } from "../utilities/helpers";
import TitleBack from './TitleBack';
import { FontAwesome } from '@expo/vector-icons';

export default function TagAdder({ title, tags, setTags, defaultTags, friendId }) {
    const router = useRouter();
  const scrollViewRef = useRef<ScrollView>();

  const [inputValue, setInputValue] = useState('');
  const [suggestedTags, setSuggestedTags] = useState([]);

  let suggestionTimeout : ReturnType <typeof setTimeout>; // timeout for call to fetch suggestions

  const showToasts = () => {
    Toast.success('Tags Updated');
  };

  function scrollViewSizeChanged(height) {
    // y since we want to scroll vertically, use x and the width-value if you want to scroll horizontally
    scrollViewRef.current?.scrollTo({ y: height, animated: true });
  }

  const tagExists = (tags, newTag) => {
    // to check if tag exists, handles cases where tag is object or string
    return tags.some((tag) => {
      if (typeof tag === 'string') return tag === newTag;
      else if (typeof tag === 'object' && tag.title)
        return tag.title === newTag.title;
      return false;
    });
  };

  const fetchSuggestions = async (value : string) => {
    if (value === '' || value.length < 3)
      return setSuggestedTags([]); // requires search term of 3 => characters
    else {
      const suggestions = await tagsService.getSuggestions(value);
      setSuggestedTags(suggestions);
    }
  };

  const handleInputChange = async (input) => {
    setInputValue(input.trim());

    clearTimeout(suggestionTimeout); // clears timeout if user changes input again before fetch 

    suggestionTimeout = setTimeout(() => {
        fetchSuggestions(input.trim());
    }, 1000); // timeout of 1 second before input gets used for suggestions
  };

  const handleSugguestionPress = async (suggestion) => {
    if (!tagExists(tags, suggestion)) {
      setTags((prevTags) => [...prevTags, suggestion]); // adds tag object
      setInputValue('');
      setSuggestedTags([]);
    }
  };

  const handleAddDefaultTag = (tag) => {
    if (!tagExists(tags, tag)) setTags((prevTags) => [...prevTags, tag]); // adds tag object
  };

  const handleRemoveTag = (tag) => {
    setTags((prevTags) =>
      prevTags.filter((prevTag) => !tagExists([prevTag], tag))
    );
  };

  const handleTagPress = async () => {
    if (inputValue && !tagExists(tags, inputValue)) {
        setTags((prevTags) => [...prevTags, inputValue]); // adds string tag
        setInputValue('');
      }
  }

  const handleSubmit = async () => {
    showToasts();

    const response = await tagsService.updateTags(friendId, tags);
    if (response.message === 'Tags updated successfully') {
      setTimeout(() => {
        router.push(`/users/${friendId}`);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <ToastManager />

      <View style={{ flexDirection: 'column', gap: 8, maxHeight: 160 }}>
        <TitleBack title={title} marginLeft={-100} />
        <Text style={{ textAlign: 'center' }}>
          What’s your friend into? Adding tags helps Presently give more
          accurate gift suggestions.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            maxHeight: 200,
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../assets/images/singer.png')}
            style={{ height: 100, width: 100 }}
          />
          <Image
            source={require('../assets/images/biker.png')}
            style={{
              height: 130,
              width: 100,
              transform: [{ rotateY: '180deg' }],
            }}
          />
          <Image
            source={require('../assets/images/gardner.png')}
            style={{
              height: 100,
              width: 100,
              transform: [{ rotateY: '180deg' }],
            }}
          />
        </View>
      </View>
      <View style={styles.topContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            paddingBottom: 20,
          }}
        >
          <TextInput
            placeholder="Type to create custom tag"
            value={inputValue}
            onChangeText={handleInputChange}
            onSubmitEditing={handleTagPress}
            style={styles.input}
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity
            onPress={handleTagPress}
            disabled={inputValue === '' || tags.includes(inputValue)}
            style={{
              position: 'relative',
              right: 32,
              top: 0,
              bottom: 0,
              height: 30,
              width: 30,
            }}
          >
            <FontAwesome name={'plus-circle'} size={30} color={colors.green} />
          </TouchableOpacity>
        </View>

        <Text>Suggested Tags</Text>
        <View style={{ maxHeight: 140 }}>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={(width, height) => {
              scrollViewSizeChanged(height);
            }}
          >
            <View style={styles.tagList}>
              {suggestedTags && suggestedTags.length > 0 && suggestedTags.map((tag) => (
                <TouchableOpacity
                  key={tag.title}
                  onPress={() => handleSugguestionPress(tag)}
                  style={styles.tagButton}
                >
                  <Text
                    key={tag.title}
                    style={{ fontFamily: 'PilcrowMedium' }}
                  >
                    {capitalizeFirstLetter(tag.title)} +
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>


        <Text>Added Tags</Text>
        <View style={{ maxHeight: 140 }}>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={(width, height) => {
              scrollViewSizeChanged(height);
            }}
          >
            <View style={styles.addedTagsContainer}>
              {tags.map((tag) => (
                <TouchableOpacity
                  key={typeof tag === 'object' ? tag.title : tag}
                  onPress={() => handleRemoveTag(tag)}
                  style={styles.tagSelectButton}
                >
                  <Text
                    key={typeof tag === 'object' ? tag.title : tag}
                    style={{
                      fontFamily: 'PilcrowMedium',
                      color: colors.brightWhite,
                    }}
                  >
                    {capitalizeFirstLetter(typeof tag === 'object' ? tag.title : tag)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={{ maxHeight: 240 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {defaultTags.map((group, key) => (
              <View key={group.section}>
                <Text>
                  {capitalizeFirstLetter(group.section)}
                </Text>
                <View style={styles.tagList}>
                  {group.tags.map((tag) => (
                    <TouchableOpacity
                      key={tag._id}
                      onPress={() => handleAddDefaultTag(tag)}
                      style={styles.tagButton}
                    >
                      <Text style={{ fontFamily: 'PilcrowRounded' }}>
                        {capitalizeFirstLetter(tag.title)} +
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.cream,
  },
  topContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,

    backgroundColor: colors.brightWhite,
    borderRadius: 10,
    width: '100%',
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  addedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 5,
    borderRadius: 20,
    margin: 5,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagButton: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    margin: 5,
    backgroundColor: colors.brightWhite,
  },
  tagSelectButton: {
    padding: 15,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    margin: 5,
    backgroundColor: colors.green,
    color: colors.brightWhite,

    opacity: 0.95,
  },
  tagSelectText: {
    fontSize: 18,

    color: colors.brightWhite,
    fontFamily: 'PilcrowBold',
  },
  button: {
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'PilcrowRounded',
  },
});
