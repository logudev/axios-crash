// AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-Token"] =
  "sjhbfwkjfbkjef.wefvskjhbwefg.kjwefkjnqkwjfan";

// GET REQUEST
function getTodos() {
  //   axios({
  //     method: "get",
  //     url: "http://jsonplaceholder.typicode.com/todos",
  //     params: {
  //       _limit: "5",
  //     },
  //   })
  axios
    .get("http://jsonplaceholder.typicode.com/todos", {
      params: {
        _limit: 5,
      },
    })
    .then((res) => {
      console.log(res.data);
      showOutput(res);
    })
    .catch((err) => {
      console.log("Logu Error");
      console.log(err);
    });
}

// POST REQUEST
function addTodo() {
  //   axios({
  //     method: "post",
  //     url: "http://jsonplaceholder.typicode.com/todos",
  //     data: {
  //       userId: 1,
  //       title: "Finish homework",
  //       completed: false,
  //     },
  //   })

  axios
    .post("http://jsonplaceholder.typicode.com/todos", {
      title: "Finish Homework",
      completed: true,
    })
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      console.log("Logu Error");
      console.log(err);
    });
}

// PUT/PATCH REQUEST
function updateTodo() {
  // axios.put, axios.patch => put - replace entirely, patch - replace whatever is sent alone
  axios
    .put("http://jsonplaceholder.typicode.com/todos/1", {
      title: "Football",
    })
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      console.log("Logu Error");
      console.log(err);
    });
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("http://jsonplaceholder.typicode.com/todos/1")
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      console.log("Logu Error");
      console.log(err);
    });
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get("http://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("http://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    // .then(res => {
    //     console.log(res);
    //     console.log(res[0]);
    //     console.log(res[1]);
    //     showOutput(res[1]);
    // })
    .then(
      axios.spread((todos, posts) => {
        console.log(todos);
        console.log(posts);
        showOutput(posts);
      })
    )
    .catch((err) => {
      console.log("Logu Error");
      console.log(err);
    });
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "sometoken",
    },
  };

  axios
    .post(
      "http://jsonplaceholder.typicode.com/todos",
      {
        title: "Play cricket",
        completed: false,
      },
      config
    )
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  axios({
    method: "post",
    url: "http://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  }).then((res) => {
    console.log(res);
    showOutput(res);
  });
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get("http://jsonplaceholder.typicode.com/todost", {
      params: {
        _limit: 5,
      },
    })
    .then((res) => {
      console.log(res.data);
      showOutput(res);
    })
    .catch((err) => {
      console.log("Logu Error");
      console.log(err.response);
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    });
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES
// More like a middleware that will be invoked everytime when axios request is made
axios.interceptors.request.use(
  (config) => {
    console.log("Request config Log");
    console.log(config);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES

const axiosClient = axios.create({
  baseURL: "http://jsonplaceholder.typicode.com",
});

// axiosClient.get("/todos?_limit=5", { timeout: 5 }).then((res) => console.log(res.data));

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Response Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Response Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Response Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>

  `;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
