import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      modals: {
        addChannel: {
          header: 'Create a new channel',
          body: 'Channel name',
          confirm: 'Create',
          cancel: 'Cancel',
        },
        renameChannel: {
          header: 'Rename channel',
          body: 'Channel name',
          confirm: 'Rename',
          cancel: 'Cancel',
        },
        removeChannel: {
          header: 'Remove channel',
          body: 'Are you sure you want to remove channel? This action cannot be undone!',
          confirm: 'Remove',
          cancel: 'Cancel',
        },
      },
      elements: {
        channelList: 'Channels',
        sendButton: 'Send',
        removeButton: 'Remove',
        renameButton: 'Rename',
        inputText: 'Message',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
