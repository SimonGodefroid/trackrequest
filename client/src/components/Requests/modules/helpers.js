import unset from 'lodash/unset';

export const sanitizeFormValues = formValues => {
  const cleanValues = { ...formValues };
  cleanValues.sourceArtist = formValues.sourceArtistSelect.value;
  cleanValues.sourceTrack = formValues.sourceTrackSelect.value;
  cleanValues.targetArtist = formValues.targetArtistSelect.value;
  unset(cleanValues, 'sourceArtistSelect');
  unset(cleanValues, 'sourceTrackSelect');
  unset(cleanValues, 'targetArtistSelect');
  console.log(cleanValues);
  return cleanValues;
};
