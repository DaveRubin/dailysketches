const FB = require("fb");
const fs = require("fs");
const fetch = require("node-fetch");

FB.setAccessToken(
  "EAAEvGyQ8l40BABPlue6CpOPzmIdfJAeZBIzB7vKOf7BlMcfD9O70K6eGWkmGXnosz8HbDX4VvEERLCCQIIV2rVKcQQfZCkW1vha3GkHH0AADalV1rp5ZAc0eZA7VZBXUi977XFjwCDEdZArN9UUvj4uE1AEZADGEmHJFx6S1O0R3wCAnZCgZAO4ZAA3QVEBuIiR0Suk3ZCVZBgUV5zEEkLZC7R8VsDAdvgH1JPxw4MYtSj0ZCCZBZBGdMVngFAWf"
);
const PHOTOS_FILE = "photos.json";
const REACTIONS_FILE = "reactions.json";
const updatePOSTSFile = () => {
  const arr = [];
  const updateArr = (addition,fileName = PHOTOS_FILE) => {
    arr.push(...addition);
    fs.writeFileSync(PHOTOS_FILE, JSON.stringify(arr), "utf8");
  };

  async function fetchURL(url) {
    const response = await (await fetch(url)).json();
    console.log("------");
    updateArr(response.data);
    if (response.paging.next) {
      fetchURL(response.paging.next);
    }
  }
  FB.api(
    "/3369506113083730/photos",
    "GET",
    { fields: "name,picture,source,created_time,comments.summary(1),likes.summary(1)" },
    async function (response) {
      console.log("=======");
      const photos = response.data;
      console.log(response);

      updateArr(photos);
      if (response.paging.next) {
        fetchURL(response.paging.next);
      }
    }
  );
};

// LIKE, LOVE, WOW, HAHA, SORRY, ANGRY
// updatePOSTSFile();
const  getReactions = async () => {
    const photos = require('../myjsonfile.json')
    const obj = require('../reactions.json')
    // const obj = {};
    for (let index = 0; index < photos.length; index++) {
    // for (let index = 239; index < photos.length; index++) {
    // for (let index = 472; index < photos.length; index++) {
        console.log(index)
        const element = photos[index];
        const reaction = await new Promise((resolve)=>{
            const fields = ['LIKE', 'LOVE',' WOW', 'HAHA', 'SORRY', 'ANGRY']
            .map(reaction=>`reactions.type(${reaction}).limit(0).summary(total_count).as(${reaction.toLowerCase()})`)
            .join(',')
            console.log(fields)
            FB.api(
                `/4952893628078296_${element.id}`,
                "GET",
                { fields: ['NONE', 'LIKE', 'LOVE', 'WOW', 'HAHA', 'SAD', 'ANGRY', 'THANKFUL', 'PRIDE', 'CARE', 'FIRE', 'HUNDRED']
                    .map(reaction=>`reactions.type(${reaction}).limit(0).summary(total_count).as(${reaction.toLowerCase()})`)
                    .join(', ') 
                },
                async function (response) {
                  resolve(response)
                }
              );
        })
        console.log(reaction)
        if (reaction.error) {
            return ;
        }
        obj[element.id] = reaction;
        fs.writeFileSync(REACTIONS_FILE, JSON.stringify(obj), "utf8");
    }
    
}
// getReactions();
const convertReactions = ()=> {
    const files = require('../reactions.json')
    console.log(Object.values(files).length);
    Object.values(files).forEach(value=>{
        // console.log(value)
        value.none = value.none.summary.total_count;
        value.like = value.like.summary.total_count;
        value.love = value.love.summary.total_count;
        value.wow = value.wow.summary.total_count;
        value.haha = value.haha.summary.total_count;
        value.sad = value.sad.summary.total_count;
        value.angry = value.angry.summary.total_count;
        value.thankful = value.thankful.summary.total_count;
        value.pride = value.pride.summary.total_count;
        value.care = value.care.summary.total_count;
        value.fire = value.fire.summary.total_count;
        value.hundred = value.hundred.summary.total_count;
    })
    // console.log(files)
    // fs.writeFileSync("filteredReactions.json", JSON.stringify(files), "utf8");
}
convertReactions();
// console.log(files)
// // console.log(files[496].likes.summary.total_count)
// files.sort((a,b)=>(a.likes.summary.total_count) - b.likes.summary.total_count)
// console.log(files[496])
