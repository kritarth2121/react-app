import React ,{useState ,useEffect} from 'react';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';
import youtube from '../apis/youtube';
import SearchVideo from './SearchVideo';
const KEY = "AIzaSyB1so2JSVlGwiWE4u_sUFsKYPzarWcnNAQ";


class Videos extends React.Component {
state ={videos : [],selectedVideo:null}
onTermSubmit = async(term) => {
    const response = await youtube.get('/search',{
        params: {
            q: term,
            part:'snippet',
            maxResults :5,
            type: 'video',
            key:KEY,
        },
    });
this.setState({
    videos:response.data.items,
    selectedVideo : response.data.items[0],
});

}
onVideoSelect =video =>{
    this.setState({selectedVideo:video});
};

render(){
return(
    <div className="ui container">
        <SearchVideo onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
            <div className="ui row">
                <div className="eleven wide column">

                    <VideoDetail video={this.state.selectedVideo}/>

                </div>
                <div className="five wide column">
                    <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                </div>
            </div>
        </div>
    </div>

    );
}

}


export default Videos;