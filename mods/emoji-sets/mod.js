/*
 * emoji sets
 * (c) 2020 dragonwocky <thedragonring.bod@gmail.com> (https://dragonwocky.me/)
 * under the MIT license
 */

'use strict';

let tweaked = false;

module.exports = {
  id: 'a2401ee1-93ba-4b8c-9781-7f570bf5d71e',
  tags: ['extension'],
  name: 'emoji sets',
  desc: 'pick from a variety of emoji styles to use.',
  version: '0.1.3',
  author: 'dragonwocky',
  options: [
    {
      key: 'style',
      label: '',
      type: 'select',
      value: [
        'twitter',
        'apple',
        'google',
        'microsoft',
        'samsung',
        'whatsapp',
        'facebook',
        'joypixels',
        'openmoji',
        'emojidex',
        'messenger',
        'lg',
        'htc',
        'mozilla',
      ],
    },
  ],
  hacks: {
    'renderer/preload.js'(store, __exports) {
      document.addEventListener('readystatechange', (event) => {
        if (document.readyState !== 'complete') return false;
        let queue = [];
        const observer = new MutationObserver((list, observer) => {
          if (!queue.length) requestAnimationFrame(process);
          queue.push(...list);
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          characterData: true,
        });
        function process() {
          queue = [];

          // if (
          //   (store().style === 'microsoft' && process.platform === 'win32') ||
          //   (store().style === 'apple' && process.platform === 'darwin')
          // ) {
          //   document
          //     .querySelectorAll('.notion-record-icon .notion-emoji')
          //     .forEach((el) => {
          //       el.outerHTML = `<span style="font-size: 0.9em; position: relative; bottom: 0.1em; right: 0.05em">
          //         ${el.getAttribute('alt')}
          //       </span>`;
          //     });
          //   document.querySelectorAll('.notion-emoji').forEach((el) => {
          //     el.outerHTML = `<span>${el.getAttribute('alt')}</span>`;
          //   });
          // } -- attempt load improvement by using actual emojis instead of pictures
          // ...breaks changing them again after

          if (store().style !== 'twitter' || tweaked) {
            document
              .querySelectorAll('[src*="notion-emojis.s3"]:not(.notion-emoji)')
              .forEach((el) => el.remove());
            document.querySelectorAll('.notion-emoji').forEach((el) => {
              el.style.setProperty(
                'background',
                `url(https://emojicdn.elk.sh/${el.getAttribute('alt')}?style=${
                  store().style
                })`
              );
              el.style.setProperty('background-size', 'contain');
              el.style.setProperty('opacity', '1');
            });
            tweaked = true;
          }
        }
      });
    },
  },
};
