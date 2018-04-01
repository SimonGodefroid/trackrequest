import unset from 'lodash/unset';

export const sanitizeFormValues = formValues => {
  const cleanSourceArtistImage = formValues.sourceArtistSelect.images.filter(image=>image.size==="large")[0]['#text'];
  const cleanTargetArtistImage = formValues.targetArtistSelect.images.filter(image=>image.size==="large")[0]['#text'];
  const cleanValues = { ...formValues };
  cleanValues.sourceArtist = formValues.sourceArtistSelect.value;
  cleanValues.sourceTrack = formValues.sourceTrackSelect.value;
  cleanValues.targetArtist = formValues.targetArtistSelect.value;
  cleanValues.sourceArtistImage = cleanSourceArtistImage;
  cleanValues.targetArtistImage = cleanTargetArtistImage;
  unset(cleanValues, 'sourceArtistSelect');
  unset(cleanValues, 'sourceTrackSelect');
  unset(cleanValues, 'targetArtistSelect');
  console.log(cleanValues);
  return cleanValues;
};
