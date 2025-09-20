const got = require('got-cjs');
const {sign} = require( "./thebogus.js");
const crypto = require('crypto');

async function main(url) {
  let uid = await dect_url(url);
  let device_id = "7538831731844417025";
  var url = "https://www.tiktok.com/api/item/detail/?WebIdLastTime="+Math.floor(new Date().getTime() / 1000)+"&aid=1988&app_language=vi-VN&app_name=tiktok_web&browser_language=vi&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F140.0.0.0%20Safari%2F537.36&channel=tiktok_web&clientABVersions=73675307&clientABVersions=73207293&cookie_enabled=true&coverFormat=2&data_collection_enabled=true&device_id="+device_id+"&device_platform=web_pc&focus_state=true&from_page=video&history_len=5&is_fullscreen=false&is_page_visible=true&itemId="+uid+"&language=vi-VN&odinId=6798321932329681921&os=windows&priority_region=VN&referer=&region=VN&root_referer=https%3A%2F%2Fwww.tiktok.com%2F&screen_height=864&screen_width=1536&tz_name=Asia%2FSaigon&user_is_login=true&video_encoding=mp4&webcast_language=vi-VN&msToken="+msToken(156);
  headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  }
  var xbogus = sign(url.split("?")[1], headers['User-Agent']);
  url = url + "&X-Bogus=" + encodeURIComponent(xbogus);
  // console.log(url)
  async function getData() {
    const response = await got.got(url, {
      http2: true,
      method: 'GET',
      headers: headers
    });
    const data = JSON.parse(response.body);
    return data;
  }
  return await getData();
}
function msToken(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_=-';
  const randomBytes = crypto.randomBytes(length);
  return Array.from(randomBytes, byte => characters[byte % characters.length]).join('');
}
async function dect_url(url) {
  const response = await got.got(url, {
    http2: true,
    method: 'GET',
  });
  const data = response.url.split("/")[5].split("?")[0];
  return data;
}

const url = "https://vt.tiktok.com/ZSDyng2rv/"
main(url).then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.error(error);
});
