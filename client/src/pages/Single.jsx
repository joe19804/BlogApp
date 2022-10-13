import React from 'react'
import User from '../img/user.jpg'
// import {EditOutlinedIcon} from '@mui/icons/DeleteOutlined';
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import {Link} from "react-router-dom";
import Menu from "../components/Menu";

const Single = () => {
  return (
    <div className='single'>
      <div className='content'>
        <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
      <div className='user'>
        <img src={User} alt="" />
      <div className="info">
        <span>Cathy</span>
        <p>Posted 2 days ago</p>
      </div>
      <div className='edit'>
        <Link to={`write?edit=2`}>
        <img src={Edit} alt="" />
        </Link>
        <img src={Delete} alt="" />
      </div>
      </div>
      <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
      <p>In December 2016 Edgar M. Welch drove six hours from his home to Washington DC, where he opened fire in a pizzeria with an assault rifle. He had previously read an online news story about the restaurant being the headquarters of a group of child abusers run by Hillary Clinton. He decided to investigate for himself; fortunately, no one was hurt.
        The story about Hillary Clinton is one of the most famous examples of the growing phenomenon dubbed ‘fake news’. The conspiracy theory about the pizzeria began to appear on websites and social networks in late October, before the US election. This was quickly denounced by publications such as The New York Times and The Washington Post. However, many people thought that these papers were themselves lying for political ends and instead of disappearing, the fake story snowballed. Tweets from ‘Representative Steven Smith of the 15th District of Georgia’ claimed that the mainstream media were telling falsehoods. Even though both this name and district were invented, the message was re-tweeted many times. A YouTube refutation of the New York Times article got 250,000 hits.
        Fake news stories can be hard to control for several reasons. Many people mistrust established news sources and others just don’t read them, so the debunking of a fake story by a serious newspaper or TV channel has limited effect. In addition, the internet is very hard to police. When users are caught misusing one media platform, they simply go to another one or start up a website themselves.
        There are also various reasons why people create fake news. Some have political motives, to belittle or incriminate their opponents. Other websites, like The Onion, deliberately publish fake news as satire – humorous comment on society and current affairs. Another group is in it for the profit: many people clicking on entertaining fake news stories can bring in a lot of advertising revenue. One man running fake news sites from Los Angeles said he was making up to US$ 30,000 a month in this way. There are also those, like the small-town teenagers in Macedonia who wrote fake news stories about Donald Trump, who seem to be motivated partly by money and partly by boredom.
        So, what can we do to stop fake news spreading? First, make sure that the websites you read are legitimate, for example by looking carefully at the domain name and the About Us section. Check the sources of any quotes or figures given in the story. Remember that amazing stories about famous people will be covered by the mainstream media if they are true. Only share stories you know are true and let your friends know, tactfully, when they unknowingly share fake news. Together we can turn around the post-truth world! </p>
      </div>
      <div className="menu">
        <Menu/>
      </div>
    </div>
  )
}

export default Single