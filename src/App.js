import { LineChart, Line, Tooltip, ResponsiveContainer, Brush } from "recharts";
import photos from "./data/myjsonfile.json";
import reactionsFile from "./data/filteredReactions.json";
import words from "./data/words.json";
import "./App.css";
import { useMemo, useState } from "react";
import { blackList } from './consts'

const data = photos.map((photo) => {
  const reactions = reactionsFile[photo.id];
  const totalLikes = Object.values(reactions).reduce((prev, current) => {
    if (typeof current === "number") {
      return prev + current;
    }
    return prev;
  }, 0);
  console.log({ reactions, totalLikes });
  const likeCommentRatio = photo.comments.summary.total_count/totalLikes
  return { ...photo, reactions, totalLikes, likeCommentRatio };
});

function CustomTooltip({ payload, active,field }) {
  if (active) {
    const photo = payload[0].payload;
    return (
      <div className="custom-tooltip">
        {Object.byString(photo,field)}
        <img src={photo.source} />
      </div>
    );
  }

  return null;
}

function App() {
  const [field,setField] = useState('totalLikes');
  const onChange = (e) => {
    setField(e.target.value)
  }
  const [filterList,setFilterList] = useState(blackList)
const addToList = (word) => ()=>{
  setFilterList([...filterList,word])
}
console.log(filterList)
  const sortedData = useMemo(()=>[...data].sort((a,b)=> Object.byString(b,field) - Object.byString(a,field)),[field])
  return (
    <div className="App">
      <header className="App-header">
        <div className="timeline-wrapper">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart width={500} height={400} data={data}>
              <Line type="monotone" dataKey={field} stroke="#8884d8" dot={{ strokeWidth: 1,r:1 }}/>
              <Tooltip content={(props)=><CustomTooltip {...props} field={field}/>} />
              <Brush />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <select onChange={onChange}>
          <option value="totalLikes">Reactions</option>
          <option value="comments.summary.total_count">Comments</option>
          <option value="likeCommentRatio">Comments/Reaction ratio </option>
        </select>
      </header>
      
      <div className="top-items">
      {sortedData.slice(0,10).map(obj=>{
      return <div className="preview">
        <img src={obj.source} alt="" />
        <p>
        {Object.byString(obj,field)}
        <br/>
          {obj.name}
        </p>
        </div>})
      }
      </div>
      <p>
        {words.map(([word,count])=>!filterList.includes(word) && 
        <span onClick={addToList(word)}>
          {word} ({count}) 
          </span>)}
      </p>
    </div>
  );
}

export default App;
