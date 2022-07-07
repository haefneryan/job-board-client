import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { fetchData, fetchDataSuccess } from "./actions/fetchDataActions";
import { url } from "./functions/url";
import { setInitialFilteredData } from "./actions/filteredDataActions";

import AllJobPosts from "./pages/AllJobPosts";
import CreateJobPost from "./pages/CreateJobPost";
import UpdateJobPost from "./pages/UpdateJobPost";
import Nav from "./components/Nav/Nav";

import "./App.css";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(`${url}posts`);
      dispatch(fetchDataSuccess(result));
      dispatch(setInitialFilteredData(result));
    };
    getData();
  }, []);

  if (state.data !== null) {
    return (
      <div className="App">
        <Nav />
        <Routes>
          <Route path="*" element={<Navigate to="/" />}></Route>
          <Route exact path="/" element={<AllJobPosts />} />
          <Route exact path="/post-job" element={<CreateJobPost />} />
          <Route exact path="/update-job" element={<UpdateJobPost />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
