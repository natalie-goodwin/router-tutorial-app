/*create multiple pages with a single-page application
SPA: we only have one page, but it renders different
views based on navigation from buttons, links, urls, and any
other control; we are changing the view of a single page 
to make it seem like a traditional website with 
multiple pages. React Router is how we do this */

import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { 
  BrowserRouter as Router,
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
    <Container>
    <Router>
      <div>
        <ButtonGroup>
          <Button variant="outline-secondary">
          <Link to="/">Home</Link>
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline-secondary">
          <Link to="/friends">Friends</Link>
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline-secondary">
          <Link to="/posts">Posts</Link>
          </Button>
        </ButtonGroup>
        
        <Switch>
          <Route path='/posts'>
            <Posts posts={posts} />
          </Route>
          <Route path="/friends">
            <Friends names={["Tom", "Sally", "Samantha"]} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </Container>
  ); /*Routes render different components depending on URL we currently visit */
}

function Home() {
  return <h2>Home</h2>
}

function Friends(props) {
  const { names } = props;
 
  return(
    <div>
    <ul>
    {names.map((friend, index) => (
      <li key={index}>{friend}</li>
    ))}
    </ul>
  </div>
  ) /*must pass name of friend and index */
  
}

function Posts({ posts }) {
  /*posts will display a link to all the individual posts
  and when we click on one of those links, that link will display all the details
  about the specific post*/
  const match = useRouteMatch();
  const findPostById = (id) =>
    posts.filter((post) => post.id == id)[0];

  return (
    <div>
      <h2>Posts</h2>
      
        {posts.map((post, index) => {
          return (
            <Alert key={index} variant="primary"> 
              <Link to={`{match.url}/${post.id}`}>
                {post.title}
              </Link>
            </Alert>
          );
        })}
      
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
  return data == undefined ? <h1>404 Not Found</h1> : (
    <Card>
      <Card.Header>{data.title}<Card.Header>
        <Card.Body>
        <Card.Subtitle>{data.date}</Card.Subtitle>
        <Card.Text>{data.content}</Card.Text>
        </Card.Body>      
    </Card>
  );
}