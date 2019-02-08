import React, { useState, useEffect } from "react";
import TestRenderer from "react-test-renderer";
import useSocket from "../src/index.js";
import { expect } from "chai";

describe("Basic Test:", () => {
  it("TestCase1", done => {
    const TestCase1 = () => {
      const uri = "ws://host:port";
      const [socket] = useSocket(uri, {
        autoConnect: false
      });
      expect(socket.io.uri).equal(uri);
      expect(socket.io.autoConnect).equal(false);

      const uri2 = "wss://host:port";
      const [socket2] = useSocket(uri2, {
        autoConnect: false
      });
      expect(socket.io.uri).equal(uri);
      expect(socket2.io.uri).equal(uri2);

      return null;
    };

    TestRenderer.create(<TestCase1 />);

    done();
  });
});

describe("Hook Test:", () => {
  it("TestCase2", done => {
    let socket;
    const TestCase2 = () => {
      [socket] = useSocket("ws://host:port", {
        autoConnect: false
      });
      socket.on("testcase2", null);
      return null;
    };
    const testRenderer = TestRenderer.create(<TestCase2 />);
    expect(typeof socket._callbacks["$testcase2"] !== "undefined").equal(true);
    testRenderer.unmount();
    expect(typeof socket._callbacks["$testcase2"] !== "undefined").equal(false);

    done();
  });
});
