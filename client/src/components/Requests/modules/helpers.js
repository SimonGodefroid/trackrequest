import unset from 'lodash/unset';

export const sanitizeFormValues = formValues => {
  console.log('formValues',formValues)
  const cleanSourceArtistImage = formValues.sourceArtistSelect.images.filter(
    image => image.size === 'large',
  )[0]['#text'];
  const cleanTargetArtistImage = formValues.targetArtistSelect.images.filter(
    image => image.size === 'large',
  )[0]['#text'];
  const sourceArtistUrl = formValues.sourceArtistSelect.url;
  const targetArtistUrl = formValues.targetArtistSelect.url;
  const cleanValues = { ...formValues };
  cleanValues.sourceArtist = formValues.sourceArtistSelect.value;
  cleanValues.sourceTrack = formValues.sourceTrackSelect.value;
  cleanValues.targetArtist = formValues.targetArtistSelect.value;
  cleanValues.sourceArtistImage = cleanSourceArtistImage;
  cleanValues.targetArtistImage = cleanTargetArtistImage;
  cleanValues.recipe = formValues.recipeSelect.value;
  cleanValues.sourceArtistUrl = sourceArtistUrl;
  cleanValues.targetArtistUrl = targetArtistUrl;
  cleanValues.flavour = formValues.flavourSelect.value;
  cleanValues.songUrl = formValues.sourceTrackSelect.songUrl;
  unset(cleanValues, 'sourceArtistSelect');
  unset(cleanValues, 'sourceTrackSelect');
  unset(cleanValues, 'targetArtistSelect');
  unset(cleanValues, 'targetArtistSelect');
  unset(cleanValues, 'recipeSelect');
  unset(cleanValues, 'flavourSelect');
  return cleanValues;
};
