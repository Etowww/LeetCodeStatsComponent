//DBTow LeetCode Stats Component

//[Last updated Oct 2nd]

import axios from 'axios';

// New GraphQL query for fetching submission stats
const getLeetCodeStatsQuery = `
  {
    matchedUser(username: "EvanTow") {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

// Function to fetch LeetCode submission stats
const fetchLeetCodeStats = async () => {
  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query: getLeetCodeStatsQuery
    }, {
      headers: {
        'Content-Type': 'application/json',
        // Include authorization token if required
        // 'Authorization': 'Bearer YOUR_TOKEN' // Replace with your actual token if needed
      }
    });

    // Log the entire response for debugging
    console.log('Response:', response.data);

    // Extract and print submission stats
    const submissionStats = response.data.data?.matchedUser?.submitStats?.acSubmissionNum;

    if (submissionStats) {
      console.log(`Submission Stats for ${response.data.data.matchedUser.username}:`);
      submissionStats.forEach(stat => {
        console.log(`Difficulty: ${stat.difficulty}, Count: ${stat.count}, Submissions: ${stat.submissions}`);
      });
    } else {
      console.log('Submission stats data is not available.');
    }

  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
  }
};

// Call the function
fetchLeetCodeStats();
