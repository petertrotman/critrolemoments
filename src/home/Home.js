import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > main {
    max-width: 40em;
    font-size: 1.2em;
  }

  p.leader {
    font-size: 1.2em;
    font-weight: 600;
  }
`;

const Home = () => (
  <Container>
    <main>
      <p className="leader">Hello everyone, and welcome to Critical Role Moments; a website dedicated to making it easier to share your favourite moments from <a href="http://geekandsundry.com/shows/critical-role/">Critical Role.</a></p>
      <p>Getting started guide:</p>
      <ul>
        <li>Click <Link to="/explore">Explore</Link> in the navigation bar (the aperture icon).</li>
        <li>Have a browse through the moments using the available filters.</li>
        <li>Click the Heart next to the ones you particularly like.</li>
        <li>Share moments with your friends with the Share button.</li>
        <li>Review your saved moments in the <Link to="/moments">Moments</Link> tab (the heart icon).</li>
      </ul>
      <p>Advanced guide:</p>
      <ul>
        <li>Create new moments for the community in the <Link to="/create">Create</Link> tab (the plus icon).</li>
        <li>Copy and Claim moments by Editing them as you explore.</li>
        <li>Send Feedback using the link in the <Link to="/settings">Settings</Link> tab (the cog icon).</li>
      </ul>
      <p>More Advanced guide:</p>
      <ul>
        <li>Come to the repository on <a href="https://github.com/petertrotman/critrolemoments">Github</a> and contribute your skills!</li>
      </ul>
      <p>I hope you find this tool useful and I can't wait to see all the amazing moments that I've missed so far!</p>
    </main>
  </Container>
);

export default Home;
