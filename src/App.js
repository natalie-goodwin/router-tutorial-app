/*create multiple pages with a single-page application
SPA: we only have one page, but it renders different
views based on navigation from buttons, links, urls, and any
other control; we are changing the view of a single page 
to make it seem like a traditional website with 
multiple pages. React Router is how we do this */

import React from "react";
// import Home from '../home';
// import Friends from '../friends';
// import Posts from '../posts';
import { 
 
  Switch,
  Route,
  Link,
  useRouteMatch 
} from 'react-router-dom';

/*these represent different routes
we want to have access to */

export default function App() {
  const posts = [
    {
      id: 1,
      title: "My First Post",
      date: "4-7-2020",
      content: "This is my first post!"
    },
    {
      id: 2,
      title: "Checking In",
      date: "4-8-2020",
      content: "Yesterday was a good day, looking forward to another!"
    },
    {
      id: 3,
      title: "Vacation Time!",
      date: "4-9-2020",
      content: "Finally time to head to Cancun for our trip!"
    }
  ];

  return ( /*link changes URL and based on change of URL we later use routes that read the URL and change the view; links change the URL */
  
      <div>
        <ul>
          <li>
             <Link to="/">Home</Link>
          </li>
          <li>
             <Link to="/friends">Friends</Link>
          </li>
          <li>
             <Link to="/posts">Posts</Link>
          </li>
        </ul>        
        <Switch>
          <Route path='/posts'>
            <Posts />
          </Route>
          <Route path="/friends">
            <Friends />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    
  ); /*Routes render different components depending on URL we currently visit */
}

function Home() {
  return <h2>Home</h2>
}

function Friends(props) {
  const { names } = props;

  return (
    <div>
        <ul>
          {names.map((friend, index) => (
            <li key={index}>{friend}</li>
          ))}
        </ul>
    </div>
  );  
}

function Posts({ posts }) {
  const match = useRouteMatch();
  const findPostById = (id) => 
  posts.filter((post) => post.id == id)[0];
    return (
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map((post, index) => {
            return (
              <li key={index}>
                <Link to={`${match.url}/${post.id}`}>
                   {post.title}
                </Link>                  
              </li>
            );
          })}
        </ul>
        <Switch>
          <Route
          path={`${match.path}/:postId`}
          render={(props) => (
            <Post
              {...props}
              data={findPostById(props.match.params.postId)}
              />
          )}
            />
            <Route path={match.path}>
              <h3>Please Select a Post.</h3>
            </Route>
        </Switch>
      </div>
    );
}
 
function Post(props) {
  const { data } = props;
  return (
    <div>
      <h3>{data.title}</h3>
      <h4>{data.date}</h4>
      <p>{data.content}</p>
    </div>
  )
}   


