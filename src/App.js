import "./style.scss";
import React ,{useState , useRef , useEffect} from "react";
import { ReplyIcon, RetweetIcon ,LikeIcon , ShereIcon , VeryfyIcon} from "./icons";
import { AvatarLoader } from "./loaders";
import { useScreenshot } from 'use-react-screenshot';

const tweetFormat = tweet =>{
  tweet = tweet
  .replace(/@([\w]+)/g,'<span>@$1</span>')
  .replace(/#([\wşçöğüİı]+)/gi,'<span>#$1</span>')
  .replace(/(https?:\/\/[\w\.\/]+)/, '<span>$1</span>')
  return tweet
}
const formatNumber = number =>{
  if(!number ){
    number = 0;
  }
  if(number<1000){
     return number
  }
  number /= 1000;
  number = String(number).split('.')
  return number[0]+ (number[1] > 100 ? ',' + number[1].slice(0,1) :' B') + ' B'
 
}
function App() {   
  const tweetRef = useRef(null)
  const downloadRef = useRef()
  const [name, setName] = useState();
  const [username, setUserName] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [tweet, setTweet] = useState();
  const [reTweet, setReTweet] = useState(0);
  const [qouteTweets, setQouteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [avatar, setAvatar] = useState(false)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => takeScreenshot(tweetRef.current);

  useEffect(()=>{
    if(image){
      downloadRef.current.click();
    }
    console.log(image);
  },[image])

  const avatarHandle = (e) =>{
   const file = e.target.files[0]
   const reader = new FileReader()

   reader.addEventListener('load' , function(){
    setAvatar(this.result)
   });
   reader.readAsDataURL(file)
  }
  return (
    // 1da1f2
    <>
    <div className="tweet-settings">
      <h3>Tweet Ayarları</h3>
      <ul>
        <li>
          <label>Ad Soyad</label>
          <input type="text" className="input"  value={name} onChange={(e) => setName(e.target.value)}/>
        </li>
        <li>
        <label>Kullanıcı Adı</label>
          <input type="text" className="input" value={username} onChange={(e) => setUserName(e.target.value)}/>
        </li>
        <li>
        <label>Tweet</label>
          <textarea maxLength="290" className="textarea" value={tweet} onChange={(e) => setTweet(e.target.value)}/>
        </li>
        <li>
        <label>Retweet</label>
          <input type="number" className="input" value={reTweet} onChange={(e) => setReTweet(e.target.value)}/>
        </li>
        <li>
        <label>Avatar</label>
          <input type="file" className="input" onChange={avatarHandle}/>
        </li>
        <li>
        <label>Alıntı Tweet</label>
          <input type="number" className="input" value={qouteTweets} onChange={(e) => setQouteTweets(e.target.value)}/>
        </li>
        <li>
        <label>Beğeni</label>
          <input type="number" className="input" value={likes} onChange={(e) => setLikes(e.target.value)}/>
        </li>
        <button onClick={getImage} >Oluştur</button>
        <div className="download-url">
         {image&& (<a ref={downloadRef} href={image} download="tweet.png">
          Tweeti İndir
          </a>)}
        </div>
      </ul>
    </div>
    <div className="tweet-container">
      <div className="tweet" ref={tweetRef}>
        <div className="tweet-author">
          {avatar && <img src={avatar} /> || <AvatarLoader/>}
          <div>
          
            <div className="name">{name || 'Ad Soyad'}<span>{isVerified && <VeryfyIcon/>}</span>
            </div>
            <div className="username">@{username || 'adsoyad'}</div>
          </div>
        </div>
        <div className="tweet-content">
          <p dangerouslySetInnerHTML={
            {__html:
              tweet && tweetFormat(tweet) ||
             'Bu Alana Örnek Tweet Gelecek'
             }}>
          </p>
        </div>
        <div className="tweet-stats">
          <span>
            <b>{formatNumber(reTweet)}</b>Retweet
          </span>
          <span>
            <b>{formatNumber(qouteTweets)}</b>Alıntı Tweetler
          </span>
          <span>
            <b>{formatNumber(likes)}</b>Beğeni
          </span>
        </div>
        <div className="tweet-actions">
          <span>
            <ReplyIcon />
          </span>
          <span>
            <RetweetIcon />
          </span>
          <span><LikeIcon/></span>
          <span><ShereIcon/></span>
        </div>
      </div>
    </div>
      
    </>
  );
}

export default App;

