import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
// import StarBorderIcon from '@material-ui/icons/StarBorder';

const SUGGESTIONS = [
  {
    name: 'Call Out My Name',
    duration: '0',
    playcount: '531882',
    listeners: '93319',
    mbid: '',
    url: 'https://www.last.fm/music/The+Weeknd/_/Call+Out+My+Name',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'The Weeknd',
      mbid: 'c8b03190-306c-4120-bb0b-6f2ebfc06ea9',
      url: 'https://www.last.fm/music/The+Weeknd',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/74de342245fbcdf2050d401b593cd90f.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Nice For What',
    duration: '0',
    playcount: '445956',
    listeners: '71083',
    mbid: '',
    url: 'https://www.last.fm/music/Drake/_/Nice+For+What',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Drake',
      mbid: 'b49b81cc-d5b7-4bdd-aadb-385df8de69a6',
      url: 'https://www.last.fm/music/Drake',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/8b1974079754d9a3e194076bccd4f696.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/8b1974079754d9a3e194076bccd4f696.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/8b1974079754d9a3e194076bccd4f696.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/8b1974079754d9a3e194076bccd4f696.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: "God's Plan",
    duration: '0',
    playcount: '1109447',
    listeners: '144078',
    mbid: '',
    url: 'https://www.last.fm/music/Drake/_/God%27s+Plan',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Drake',
      mbid: 'b49b81cc-d5b7-4bdd-aadb-385df8de69a6',
      url: 'https://www.last.fm/music/Drake',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/8b1974079754d9a3e194076bccd4f696.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/8b1974079754d9a3e194076bccd4f696.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/8b1974079754d9a3e194076bccd4f696.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/8b1974079754d9a3e194076bccd4f696.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'No Tears Left To Cry',
    duration: '0',
    playcount: '1458004',
    listeners: '62398',
    mbid: '',
    url: 'https://www.last.fm/music/Ariana+Grande/_/No+Tears+Left+To+Cry',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Ariana Grande',
      mbid: 'f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387',
      url: 'https://www.last.fm/music/Ariana+Grande',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/38ef4acd6c9aef1f8a0c7b0c92a2a7cd.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/38ef4acd6c9aef1f8a0c7b0c92a2a7cd.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/38ef4acd6c9aef1f8a0c7b0c92a2a7cd.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/38ef4acd6c9aef1f8a0c7b0c92a2a7cd.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'One Kiss (with Dua Lipa)',
    duration: '0',
    playcount: '295874',
    listeners: '55305',
    mbid: '',
    url: 'https://www.last.fm/music/Calvin+Harris/_/One+Kiss+(with+Dua+Lipa)',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Calvin Harris',
      mbid: '8dd98bdc-80ec-4e93-8509-2f46bafc09a7',
      url: 'https://www.last.fm/music/Calvin+Harris',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/6c261df32200a113013406dfaa45a4b9.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/6c261df32200a113013406dfaa45a4b9.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/6c261df32200a113013406dfaa45a4b9.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/6c261df32200a113013406dfaa45a4b9.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'IDGAF',
    duration: '0',
    playcount: '1267674',
    listeners: '141640',
    mbid: '',
    url: 'https://www.last.fm/music/Dua+Lipa/_/IDGAF',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Dua Lipa',
      mbid: '',
      url: 'https://www.last.fm/music/Dua+Lipa',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/4bcbc04aaa375be0be5dd842d0e13353.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/4bcbc04aaa375be0be5dd842d0e13353.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/4bcbc04aaa375be0be5dd842d0e13353.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/4bcbc04aaa375be0be5dd842d0e13353.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'All The Stars (with SZA)',
    duration: '0',
    playcount: '933369',
    listeners: '132919',
    mbid: '',
    url: 'https://www.last.fm/music/Kendrick+Lamar/_/All+The+Stars+(with+SZA)',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Kendrick Lamar',
      mbid: '381086ea-f511-4aba-bdf9-71c753dc5077',
      url: 'https://www.last.fm/music/Kendrick+Lamar',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Feel It Still',
    duration: '0',
    playcount: '1832612',
    listeners: '234124',
    mbid: '',
    url: 'https://www.last.fm/music/Portugal.+The+Man/_/Feel+It+Still',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Portugal. The Man',
      mbid: '3599a39e-4e10-4cb5-90d4-c8a015ebc73b',
      url: 'https://www.last.fm/music/Portugal.+The+Man',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/b86f528d1b5b232274a0ceff02c02626.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/b86f528d1b5b232274a0ceff02c02626.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/b86f528d1b5b232274a0ceff02c02626.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/b86f528d1b5b232274a0ceff02c02626.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Rockstar',
    duration: '0',
    playcount: '1543010',
    listeners: '177023',
    mbid: '',
    url: 'https://www.last.fm/music/Post+Malone/_/Rockstar',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Post Malone',
      mbid: '',
      url: 'https://www.last.fm/music/Post+Malone',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/75c914daed6230294cb7431035e64cf5.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/75c914daed6230294cb7431035e64cf5.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/75c914daed6230294cb7431035e64cf5.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/75c914daed6230294cb7431035e64cf5.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Wasted Times',
    duration: '0',
    playcount: '281311',
    listeners: '60020',
    mbid: '',
    url: 'https://www.last.fm/music/The+Weeknd/_/Wasted+Times',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'The Weeknd',
      mbid: 'c8b03190-306c-4120-bb0b-6f2ebfc06ea9',
      url: 'https://www.last.fm/music/The+Weeknd',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/74de342245fbcdf2050d401b593cd90f.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Try Me',
    duration: '0',
    playcount: '264205',
    listeners: '60889',
    mbid: '',
    url: 'https://www.last.fm/music/The+Weeknd/_/Try+Me',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'The Weeknd',
      mbid: 'c8b03190-306c-4120-bb0b-6f2ebfc06ea9',
      url: 'https://www.last.fm/music/The+Weeknd',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/74de342245fbcdf2050d401b593cd90f.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'New Rules',
    duration: '0',
    playcount: '2882628',
    listeners: '221061',
    mbid: '',
    url: 'https://www.last.fm/music/Dua+Lipa/_/New+Rules',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Dua Lipa',
      mbid: '',
      url: 'https://www.last.fm/music/Dua+Lipa',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/4bcbc04aaa375be0be5dd842d0e13353.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/4bcbc04aaa375be0be5dd842d0e13353.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/4bcbc04aaa375be0be5dd842d0e13353.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/4bcbc04aaa375be0be5dd842d0e13353.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Psycho (feat. Ty Dolla $ign)',
    duration: '0',
    playcount: '528474',
    listeners: '82362',
    mbid: '',
    url: 'https://www.last.fm/music/Post+Malone/_/Psycho+(feat.+Ty+Dolla+$ign)',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Post Malone',
      mbid: '',
      url: 'https://www.last.fm/music/Post+Malone',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/75c914daed6230294cb7431035e64cf5.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/75c914daed6230294cb7431035e64cf5.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/75c914daed6230294cb7431035e64cf5.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/75c914daed6230294cb7431035e64cf5.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Wake Me Up',
    duration: '246',
    playcount: '5797172',
    listeners: '614650',
    mbid: '72281f36-2845-4c70-95fd-bffbbeab1ef8',
    url: 'https://www.last.fm/music/Avicii/_/Wake+Me+Up',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Avicii',
      mbid: 'c85cfd6b-b1e9-4a50-bd55-eb725f04f7d5',
      url: 'https://www.last.fm/music/Avicii',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'FRIENDS',
    duration: '0',
    playcount: '420737',
    listeners: '76128',
    mbid: '',
    url: 'https://www.last.fm/music/Marshmello/_/FRIENDS',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Marshmello',
      mbid: '',
      url: 'https://www.last.fm/music/Marshmello',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/a89459d5fcd3a73f367708c194c285f4.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/a89459d5fcd3a73f367708c194c285f4.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/a89459d5fcd3a73f367708c194c285f4.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/a89459d5fcd3a73f367708c194c285f4.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'I Like It',
    duration: '0',
    playcount: '189730',
    listeners: '42675',
    mbid: '',
    url: 'https://www.last.fm/music/Cardi+B/_/I+Like+It',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Cardi B',
      mbid: '',
      url: 'https://www.last.fm/music/Cardi+B',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'HUMBLE.',
    duration: '0',
    playcount: '2931160',
    listeners: '286370',
    mbid: '',
    url: 'https://www.last.fm/music/Kendrick+Lamar/_/HUMBLE.',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Kendrick Lamar',
      mbid: '381086ea-f511-4aba-bdf9-71c753dc5077',
      url: 'https://www.last.fm/music/Kendrick+Lamar',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Do I Wanna Know?',
    duration: '272',
    playcount: '11249380',
    listeners: '828169',
    mbid: 'f1e57531-e0df-4b3e-938f-1ae30c5b1a11',
    url: 'https://www.last.fm/music/Arctic+Monkeys/_/Do+I+Wanna+Know%3F',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Arctic Monkeys',
      mbid: 'ada7a83c-e3e1-40f1-93f9-3e73dbc9298a',
      url: 'https://www.last.fm/music/Arctic+Monkeys',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/26b8728bcf3ce5c3cf0cc776cd462851.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/26b8728bcf3ce5c3cf0cc776cd462851.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/26b8728bcf3ce5c3cf0cc776cd462851.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/26b8728bcf3ce5c3cf0cc776cd462851.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Havana',
    duration: '0',
    playcount: '3157252',
    listeners: '191596',
    mbid: '',
    url: 'https://www.last.fm/music/Camila+Cabello/_/Havana',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Camila Cabello',
      mbid: '',
      url: 'https://www.last.fm/music/Camila+Cabello',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/76623f9434f5cecb376820b19627c485.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/76623f9434f5cecb376820b19627c485.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/76623f9434f5cecb376820b19627c485.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/76623f9434f5cecb376820b19627c485.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Be Careful',
    duration: '0',
    playcount: '185141',
    listeners: '40992',
    mbid: '',
    url: 'https://www.last.fm/music/Cardi+B/_/Be+Careful',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Cardi B',
      mbid: '',
      url: 'https://www.last.fm/music/Cardi+B',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Love Lies (with Normani)',
    duration: '0',
    playcount: '394946',
    listeners: '58782',
    mbid: '',
    url: 'https://www.last.fm/music/Khalid/_/Love+Lies+(with+Normani)',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Khalid',
      mbid: 'c6bfb05d-f570-46c8-98e1-e25441189770',
      url: 'https://www.last.fm/music/Khalid',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/d1f226c010f2ac5574e94bcb400a4ca5.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/d1f226c010f2ac5574e94bcb400a4ca5.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/d1f226c010f2ac5574e94bcb400a4ca5.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/d1f226c010f2ac5574e94bcb400a4ca5.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Mr. Brightside',
    duration: '224',
    playcount: '17074401',
    listeners: '1904193',
    mbid: '37d516ab-d61f-4bcb-9316-7a0b3eb845a8',
    url: 'https://www.last.fm/music/The+Killers/_/Mr.+Brightside',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'The Killers',
      mbid: '95e1ead9-4d31-4808-a7ac-32c3614c116b',
      url: 'https://www.last.fm/music/The+Killers',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/6583c8519c5393cbfdaf860f8bf6d68a.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/6583c8519c5393cbfdaf860f8bf6d68a.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/6583c8519c5393cbfdaf860f8bf6d68a.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/6583c8519c5393cbfdaf860f8bf6d68a.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Bodak Yellow',
    duration: '0',
    playcount: '948240',
    listeners: '116167',
    mbid: '',
    url: 'https://www.last.fm/music/Cardi+B/_/Bodak+Yellow',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Cardi B',
      mbid: '',
      url: 'https://www.last.fm/music/Cardi+B',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'The Middle',
    duration: '0',
    playcount: '408246',
    listeners: '75433',
    mbid: '',
    url: 'https://www.last.fm/music/Zedd/_/The+Middle',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Zedd',
      mbid: '56c4b861-0922-4c3a-a9b9-3bfcb00f8274',
      url: 'https://www.last.fm/music/Zedd',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/a6fb5760f973bde031c1d210728785bf.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/a6fb5760f973bde031c1d210728785bf.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/a6fb5760f973bde031c1d210728785bf.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/a6fb5760f973bde031c1d210728785bf.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Delicate',
    duration: '0',
    playcount: '1155395',
    listeners: '76094',
    mbid: '',
    url: 'https://www.last.fm/music/Taylor+Swift/_/Delicate',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Taylor Swift',
      mbid: '20244d07-534f-4eff-b4d4-930878889970',
      url: 'https://www.last.fm/music/Taylor+Swift',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/00424fd753f05b3d3f084c234a33e7b6.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/00424fd753f05b3d3f084c234a33e7b6.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/00424fd753f05b3d3f084c234a33e7b6.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/00424fd753f05b3d3f084c234a33e7b6.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Levels',
    duration: '198',
    playcount: '3670341',
    listeners: '545346',
    mbid: '5d629e79-a05b-4a33-a84f-4ef07a1322b7',
    url: 'https://www.last.fm/music/Avicii/_/Levels',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Avicii',
      mbid: 'c85cfd6b-b1e9-4a50-bd55-eb725f04f7d5',
      url: 'https://www.last.fm/music/Avicii',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'KOD',
    duration: '0',
    playcount: '127265',
    listeners: '36023',
    mbid: '',
    url: 'https://www.last.fm/music/J.+Cole/_/KOD',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'J. Cole',
      mbid: '875203e1-8e58-4b86-8dcb-7190faf411c5',
      url: 'https://www.last.fm/music/J.+Cole',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/fe0ada53721cf753adeefa7de1217904.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/fe0ada53721cf753adeefa7de1217904.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/fe0ada53721cf753adeefa7de1217904.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/fe0ada53721cf753adeefa7de1217904.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'In My Blood',
    duration: '0',
    playcount: '573350',
    listeners: '50468',
    mbid: '',
    url: 'https://www.last.fm/music/Shawn+Mendes/_/In+My+Blood',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Shawn Mendes',
      mbid: 'b7d92248-97e3-4450-8057-6fe06738f735',
      url: 'https://www.last.fm/music/Shawn+Mendes',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/8e4bcd065ce8cd6d6588a21ec061d6c7.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/8e4bcd065ce8cd6d6588a21ec061d6c7.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/8e4bcd065ce8cd6d6588a21ec061d6c7.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/8e4bcd065ce8cd6d6588a21ec061d6c7.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Shape of You',
    duration: '0',
    playcount: '3706081',
    listeners: '335515',
    mbid: '',
    url: 'https://www.last.fm/music/Ed+Sheeran/_/Shape+of+You',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Ed Sheeran',
      mbid: 'b8a7c51f-362c-4dcb-a259-bc6e0095f0a6',
      url: 'https://www.last.fm/music/Ed+Sheeran',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/71ab2582b79a456787bf08b6e419f0dc.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/71ab2582b79a456787bf08b6e419f0dc.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/71ab2582b79a456787bf08b6e419f0dc.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/71ab2582b79a456787bf08b6e419f0dc.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Africa',
    duration: '236',
    playcount: '5197947',
    listeners: '830995',
    mbid: 'd0b884c8-6100-4ca2-855f-5ef27d963807',
    url: 'https://www.last.fm/music/Toto/_/Africa',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Toto',
      mbid: 'aab5c954-cabe-432e-899e-1c4f99757327',
      url: 'https://www.last.fm/music/Toto',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/cad95a4741ad48fdaf52effde337d910.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/cad95a4741ad48fdaf52effde337d910.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/cad95a4741ad48fdaf52effde337d910.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/cad95a4741ad48fdaf52effde337d910.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'DNA.',
    duration: '0',
    playcount: '2099235',
    listeners: '226309',
    mbid: '',
    url: 'https://www.last.fm/music/Kendrick+Lamar/_/DNA.',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Kendrick Lamar',
      mbid: '381086ea-f511-4aba-bdf9-71c753dc5077',
      url: 'https://www.last.fm/music/Kendrick+Lamar',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/cf2414c7e492d56d89e60d85b0e1c561.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Make Me Feel',
    duration: '0',
    playcount: '334258',
    listeners: '55817',
    mbid: '',
    url: 'https://www.last.fm/music/Janelle+Mon%C3%A1e/_/Make+Me+Feel',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Janelle Monáe',
      mbid: 'ee190f6b-7d98-43ec-b924-da5f8018eca0',
      url: 'https://www.last.fm/music/Janelle+Mon%C3%A1e',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/f7bbce3748fb081077c0659547b29a2f.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/f7bbce3748fb081077c0659547b29a2f.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/f7bbce3748fb081077c0659547b29a2f.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/f7bbce3748fb081077c0659547b29a2f.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Drip (feat. Migos)',
    duration: '0',
    playcount: '124676',
    listeners: '34219',
    mbid: '',
    url: 'https://www.last.fm/music/Cardi+B/_/Drip+(feat.+Migos)',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Cardi B',
      mbid: '',
      url: 'https://www.last.fm/music/Cardi+B',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Seven Nation Army',
    duration: '449',
    playcount: '11215521',
    listeners: '1442453',
    mbid: '24cc8311-98fd-423a-bed1-97728f5eabc5',
    url: 'https://www.last.fm/music/The+White+Stripes/_/Seven+Nation+Army',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'The White Stripes',
      mbid: '11ae9fbb-f3d7-4a47-936f-4c0a04d3b3b5',
      url: 'https://www.last.fm/music/The+White+Stripes',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/c405fe32754a4b038afa93016ff0ba1f.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/c405fe32754a4b038afa93016ff0ba1f.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/c405fe32754a4b038afa93016ff0ba1f.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/c405fe32754a4b038afa93016ff0ba1f.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'The Less I Know the Better',
    duration: '0',
    playcount: '3370424',
    listeners: '339821',
    mbid: '',
    url: 'https://www.last.fm/music/Tame+Impala/_/The+Less+I+Know+the+Better',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Tame Impala',
      mbid: '63aa26c3-d59b-4da4-84ac-716b54f1ef4d',
      url: 'https://www.last.fm/music/Tame+Impala',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/af87aba641a04fa9836fbf72f08b95cc.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/af87aba641a04fa9836fbf72f08b95cc.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/af87aba641a04fa9836fbf72f08b95cc.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/af87aba641a04fa9836fbf72f08b95cc.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Chun-Li',
    duration: '0',
    playcount: '266801',
    listeners: '33785',
    mbid: '',
    url: 'https://www.last.fm/music/Nicki+Minaj/_/Chun-Li',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Nicki Minaj',
      mbid: '1036b808-f58c-4a3e-b461-a2c4492ecf1b',
      url: 'https://www.last.fm/music/Nicki+Minaj',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/702ffd27c1096d8dde41efd6fda6dfde.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/702ffd27c1096d8dde41efd6fda6dfde.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/702ffd27c1096d8dde41efd6fda6dfde.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/702ffd27c1096d8dde41efd6fda6dfde.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Smells Like Teen Spirit',
    duration: '301',
    playcount: '15284296',
    listeners: '1995151',
    mbid: '0ebe2d92-a11d-4b2b-9922-806383074ed7',
    url: 'https://www.last.fm/music/Nirvana/_/Smells+Like+Teen+Spirit',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Nirvana',
      mbid: '9282c8b4-ca0b-4c6b-b7e3-4f7762dfc4d6',
      url: 'https://www.last.fm/music/Nirvana',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/32b98e42bc4754f94a8efb0ebf2138c9.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/32b98e42bc4754f94a8efb0ebf2138c9.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/32b98e42bc4754f94a8efb0ebf2138c9.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/32b98e42bc4754f94a8efb0ebf2138c9.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Mine',
    duration: '0',
    playcount: '471476',
    listeners: '73997',
    mbid: '',
    url: 'https://www.last.fm/music/bazzi/_/Mine',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: { name: 'bazzi', mbid: '', url: 'https://www.last.fm/music/bazzi' },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/b99fc95c17db506c80e1ca1558e7ec53.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/b99fc95c17db506c80e1ca1558e7ec53.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/b99fc95c17db506c80e1ca1558e7ec53.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/b99fc95c17db506c80e1ca1558e7ec53.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Privilege',
    duration: '0',
    playcount: '213256',
    listeners: '45895',
    mbid: '',
    url: 'https://www.last.fm/music/The+Weeknd/_/Privilege',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'The Weeknd',
      mbid: 'c8b03190-306c-4120-bb0b-6f2ebfc06ea9',
      url: 'https://www.last.fm/music/The+Weeknd',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/74de342245fbcdf2050d401b593cd90f.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'These Days (feat. Jess Glynne, Macklemore & Dan Caplen)',
    duration: '0',
    playcount: '316757',
    listeners: '70497',
    mbid: '',
    url:
      'https://www.last.fm/music/Rudimental/_/These+Days+(feat.+Jess+Glynne,+Macklemore+&+Dan+Caplen)',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Rudimental',
      mbid: 'b09ced80-aa65-43c1-9aa7-58b1e982eada',
      url: 'https://www.last.fm/music/Rudimental',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/3abcae4c41ee4fbf8e99af42d8b74056.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/3abcae4c41ee4fbf8e99af42d8b74056.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/3abcae4c41ee4fbf8e99af42d8b74056.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/3abcae4c41ee4fbf8e99af42d8b74056.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Look Alive (feat. Drake)',
    duration: '0',
    playcount: '337336',
    listeners: '61448',
    mbid: '',
    url: 'https://www.last.fm/music/BlocBoy+JB/_/Look+Alive+(feat.+Drake)',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'BlocBoy JB',
      mbid: '',
      url: 'https://www.last.fm/music/BlocBoy+JB',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/c0a64d35b4908d4637e025aed6aa9887.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/c0a64d35b4908d4637e025aed6aa9887.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/c0a64d35b4908d4637e025aed6aa9887.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/c0a64d35b4908d4637e025aed6aa9887.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Flames',
    duration: '0',
    playcount: '157198',
    listeners: '42742',
    mbid: '',
    url: 'https://www.last.fm/music/David+Guetta/_/Flames',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'David Guetta',
      mbid: '302bd7b9-d012-4360-897a-93b00c855680',
      url: 'https://www.last.fm/music/David+Guetta',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/c154f7ef8dcbcb0cc453ae4002453089.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/c154f7ef8dcbcb0cc453ae4002453089.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/c154f7ef8dcbcb0cc453ae4002453089.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/c154f7ef8dcbcb0cc453ae4002453089.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'SAD!',
    duration: '0',
    playcount: '425195',
    listeners: '55299',
    mbid: '',
    url: 'https://www.last.fm/music/xxxtentacion/_/SAD%21',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'xxxtentacion',
      mbid: '',
      url: 'https://www.last.fm/music/xxxtentacion',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/bd9c409b14c2ce1df49e9f1d56a41ad5.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/bd9c409b14c2ce1df49e9f1d56a41ad5.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/bd9c409b14c2ce1df49e9f1d56a41ad5.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/bd9c409b14c2ce1df49e9f1d56a41ad5.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Pynk (feat. Grimes)',
    duration: '0',
    playcount: '133251',
    listeners: '31864',
    mbid: '',
    url: 'https://www.last.fm/music/Janelle+Mon%C3%A1e/_/Pynk+(feat.+Grimes)',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Janelle Monáe',
      mbid: 'ee190f6b-7d98-43ec-b924-da5f8018eca0',
      url: 'https://www.last.fm/music/Janelle+Mon%C3%A1e',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/f7bbce3748fb081077c0659547b29a2f.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/f7bbce3748fb081077c0659547b29a2f.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/f7bbce3748fb081077c0659547b29a2f.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/f7bbce3748fb081077c0659547b29a2f.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Sky Full Of Song',
    duration: '0',
    playcount: '118420',
    listeners: '31791',
    mbid: '',
    url:
      'https://www.last.fm/music/Florence+%252B+the+Machine/_/Sky+Full+Of+Song',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Florence + the Machine',
      mbid: '5fee3020-513b-48c2-b1f7-4681b01db0c6',
      url: 'https://www.last.fm/music/Florence+%252B+the+Machine',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/816e80a2423ac4e005195119aa602a0c.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/816e80a2423ac4e005195119aa602a0c.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/816e80a2423ac4e005195119aa602a0c.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/816e80a2423ac4e005195119aa602a0c.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Barbie Tingz',
    duration: '0',
    playcount: '206887',
    listeners: '31708',
    mbid: '',
    url: 'https://www.last.fm/music/Nicki+Minaj/_/Barbie+Tingz',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Nicki Minaj',
      mbid: '1036b808-f58c-4a3e-b461-a2c4492ecf1b',
      url: 'https://www.last.fm/music/Nicki+Minaj',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/702ffd27c1096d8dde41efd6fda6dfde.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/702ffd27c1096d8dde41efd6fda6dfde.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/702ffd27c1096d8dde41efd6fda6dfde.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/702ffd27c1096d8dde41efd6fda6dfde.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Thunder',
    duration: '0',
    playcount: '1830534',
    listeners: '210891',
    mbid: '',
    url: 'https://www.last.fm/music/Imagine+Dragons/_/Thunder',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Imagine Dragons',
      mbid: '012151a8-0f9a-44c9-997f-ebd68b5389f9',
      url: 'https://www.last.fm/music/Imagine+Dragons',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/cc4a0ca262a3f10f44051a331f43d491.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/cc4a0ca262a3f10f44051a331f43d491.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/cc4a0ca262a3f10f44051a331f43d491.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/cc4a0ca262a3f10f44051a331f43d491.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Hey Brother',
    duration: '192',
    playcount: '3136217',
    listeners: '409744',
    mbid: 'e6d35064-da9c-43e7-a627-b919935bcdaa',
    url: 'https://www.last.fm/music/Avicii/_/Hey+Brother',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Avicii',
      mbid: 'c85cfd6b-b1e9-4a50-bd55-eb725f04f7d5',
      url: 'https://www.last.fm/music/Avicii',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/a7e53fbe546326716775ac79bb5593ed.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Hurt You',
    duration: '0',
    playcount: '182156',
    listeners: '43500',
    mbid: '',
    url: 'https://www.last.fm/music/The+Weeknd/_/Hurt+You',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'The Weeknd',
      mbid: 'c8b03190-306c-4120-bb0b-6f2ebfc06ea9',
      url: 'https://www.last.fm/music/The+Weeknd',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/74de342245fbcdf2050d401b593cd90f.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/74de342245fbcdf2050d401b593cd90f.png',
        size: 'extralarge',
      },
    ],
  },
  {
    name: 'Get Up 10',
    duration: '0',
    playcount: '100301',
    listeners: '31207',
    mbid: '',
    url: 'https://www.last.fm/music/Cardi+B/_/Get+Up+10',
    streamable: { '#text': '0', fulltrack: '0' },
    artist: {
      name: 'Cardi B',
      mbid: '',
      url: 'https://www.last.fm/music/Cardi+B',
    },
    image: [
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/34s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'small',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/64s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'medium',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/174s/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'large',
      },
      {
        '#text':
          'https://lastfm-img2.akamaized.net/i/u/300x300/6ed65bc7bd409bba9ceee7716567efb7.png',
        size: 'extralarge',
      },
    ],
  },
];

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

const Suggestions = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
    <h4>Get inspired by the top charts...</h4>
      <GridList className={classes.gridList} cols={2.5}>
        {SUGGESTIONS.map(suggestion => (
          <GridListTile key={suggestion.name}>
            <img src={suggestion.image[3]['#text']} alt={suggestion.name} />
            <GridListTileBar
              title={`${suggestion.artist.name} - ${suggestion.name}`}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

Suggestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Suggestions);
