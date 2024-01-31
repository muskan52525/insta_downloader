import { useState } from "react";
import axios from 'axios'
const UI = () => {
  const [videoUrl, setVideoUrl] = useState("")
  const [videoData, setVideoData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [Thumbnail, setThumbnail] = useState("");
  const [videoQuality, setvideoQuality] = useState("");
  const [videoDownloadURL, setvideoDownloadURL] = useState("");




  const getApidata = async () => {
    const options = {
      method: 'GET',
      url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
      params: {
        url: videoUrl,
        filename: 'download'
      },
      headers: {
        'X-RapidAPI-Key': '70c1e6cb18msha1e527714e7d95bp1dcc64jsn2c7ba68d2767',
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setVideoData(response.data);
      setThumbnail(response.data.picture);
      const [{ quality, link }] = response.data.links;
      setvideoQuality(quality);
      setvideoDownloadURL(link);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="lg:w-2/3 mx-auto">
        <h1 className="text-white bg-red-400 py-3.5 padding-left:10rem mb-2 lg:mb-8">Welcome to insta downloader</h1>
        <h1 className="text-white padding-left:30rem mb-4 lg:mb-8"> Made by muskan ❤️</h1>
        <div className="display: flex gap-5 justify-center">
          <div><input t type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full lg:w-auto p-2" placeholder="video downloader" /></div>
          <div> <button onClick={getApidata} className="bg-white p-2 md:p-2 rounded-md ">click to download</button>

            {isLoading && <div className="">Loading....</div>}
            {videoData && <div>
              <div className='mt-5 mb-5'>
                <video width="320" height="240" controls>
                  <source src={videoDownloadURL} />
                </video>
              </div>
              <div className='flex flex-row justify-between border-2 border-indigo-400 items-center w-10/12 p-5 m-5'>
                <img src={Thumbnail} alt="" srcset="" className='h-20 w-20' />
                <h3 className='text-white'>{videoQuality}</h3>
                <a href={videoDownloadURL} target='_blank' rel='noreferrer' className='bg-gray-300 font-bold py-7 text-white p-2 rounded'> Download </a>
              </div></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UI;