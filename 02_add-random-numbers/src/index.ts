const REQUEST_URL =
  "https://www.random.org/integers/?num=1&min=1&max=99999&col=1&base=10&format=plain&rnd=new";
const NUM_REQUESTS = 2;

const get_and_sum_numbers = async () => {
  //queue up all the requests
  const requests = [];
  for (let i = 0; i < NUM_REQUESTS; i++) {
    requests.push(get_number());
  }

  //wait for all the requests to complete
  const numbers = await Promise.all(requests);
  //   console.log("Numbers: ", numbers);

  //sum the numbers
  const sum = numbers.reduce((a, b) => a + b, 0);
  console.log("Sum: ", sum);
};

const get_number = async (): Promise<number> => {
  const requestify = require("requestify");
  return requestify
    .get(REQUEST_URL)
    .then((response: any) => {
      const body = response.getBody().trim();
      const num = Number(body);
      console.log("Got number: ", num);
      return num;
    })
    .catch((error: any) => {
      console.error("An error occurred while requesting a number.");
      throw new Error(error);
    });
};

//run
get_and_sum_numbers();
