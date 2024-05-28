import React, { useState, useEffect } from "react";
import "./Mao.css";
import axios from "axios";

function Map() {
  const [tooltip, setTooltip] = useState(false);
  const [step, setStep] = useState("");
  const [statesData, setStatesData] = useState([]);
  const [largeParty, setLargeParty] = useState("");
  const ImageUrl = "https://thewhitehousegame.com/public/";

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/getVoterPartyCount", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log("states data is :", res.data.data);
        setStatesData(res.data.data);
      })
      .catch((err) => {
        console.log("the error is :", err);
      });
  }, []);
  // const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const handleToolTip = (e) => {
    // const { pageX, pageY } = e;
    setTooltip(true);
    setStep(e);
    // setTooltipPosition({ x: pageX + 10, y: pageY + 10 });
  };
  // console.log('show me the modal please', statesData['Arkansas']["Independent('Kennedy')"])
  const handleMouseOut = () => {
    setTooltip(false);
    console.log("tooltip", tooltip);
  };

  // const backgroundColor = (state) => {
  //     if (statesData[state]) {
  //         const parties = Object.keys(statesData[state]);
  //         const counts = Object.values(statesData[state]);

  //         const maxCount = Math.max(...counts);
  //         const maxPartyIndex = counts.indexOf(maxCount);
  //         const maxParty = parties[maxPartyIndex];
  //         if (maxParty === 'Democratic') {
  //             return '#ed1c24'
  //         } else if (maxParty === 'Republican') {
  //             return '#546bed'
  //         } else {
  //             return 'white'
  //         }
  //     }
  // }

  //   const backgroundColor = (state) => {
  //     if (statesData[state]) {
  //       const parties = Object.keys(statesData[state]);
  //       const counts = Object.values(statesData[state]);
  //       const maxCount = Math.max(...counts);
  //       const maxPartyIndex = counts.indexOf(maxCount);
  //       const maxParty = parties[maxPartyIndex];
  //       if (maxParty === "Democratic") {
  //         return "#ed1c24";
  //       } else if (maxParty === "Republican") {
  //         return "#546bed";
  //       } else {
  //         return "white";
  //       }
  //     }
  //   };

  const backgroundColor = (state) => {
    if (statesData[state]) {
      const democraticCount = statesData[state].Democratic || 0;
      const republicanCount = statesData[state].Republican || 0;
      if (democraticCount > republicanCount) {
        return "#ed1c24"; // Democratic color
      } else if (republicanCount > democraticCount) {
        return "#546bed"; // Republican color
      } else {
        return "white"; // Default color if counts are equal or undefined
      }
    }
    return "white"; // Default color if state data is not available
  };

  // const voteCount = (state) => {
  //     if (statesData[state]) {
  //         const parties = Object.keys(statesData[state]);
  //         const count = Object.values(statesData[state]);
  //         const maxCount = Math.max(...count);
  //         const largeIndex = count.indexOf(maxCount);
  //         const largeParty = parties[largeIndex]
  //         return { largeParty, count: maxCount, };
  //     }
  //     return {}
  // }

  const voteCount = (state) => {
    if (statesData[state]) {
      const parties = Object.keys(statesData[state]);
      const count = Object.values(statesData[state]).filter(
        (value) => typeof value === "number"
      );
      const maxCount = Math.max(...count);
      const largeIndex = count.indexOf(maxCount);
      const largeParty = parties[largeIndex];
      const electricalCollege = statesData[state].electrical_collage; // Access electrical_collage
      return { largeParty, maxCount, electricalCollege, parties };
    }
    return {};
  };
  console.log("helloooo333333:", voteCount("Texas").parties);

  return (
    <div className="w-10/12 m-auto relative">
      {/* {tooltip && <div className='svgModal py-5 shadow-md shadow-black px-5 rounded-[10px]' >
                <h1 className='text-[30px] orbit7 text-center text-white mb-5'>{step}</h1>
                <p className='text-[20px] poppins6 text-white text-center mb-2'>DEMOCRATIC: <span className='poppins4'>{!statesData[step].Democratic ? 0 : statesData[step].Democratic}</span></p>
                <p className='text-[20px] poppins6 text-white text-center mb-2 uppercase'>Republican: <span className='poppins4'>{!statesData[step].Republican ? 0 : statesData[step].Republican}</span></p>
                <p className='text-[20px] poppins6 text-white text-center mb-2 uppercase'>independent: <span className='poppins4'>{!statesData[step]["Independent('Kennedy')"] ? 0 : statesData[step]["Independent('Kennedy')"]}</span></p>
            </div>} */}
      {/* {tooltip && (
        <div className="svgModal py-5 shadow-md shadow-black px-5 rounded-[10px]">
          <h1 className="text-[30px] orbit7 text-center text-white mb-3">
            {step}
          </h1>
          {statesData[step].state_image_url && (
            <img
              src={`${ImageUrl}${statesData[step].state_image_url}`}
              alt={`${step} image`}
              className=" object-cover m-auto mb-2"
            />
          )}{" "}
          
          <p className="text-[20px] poppins6 text-white text-center mb-2">
            DEMOCRATIC:{" "}
            <span className="poppins4">
              {!statesData[step].Democratic ? 0 : statesData[step].Democratic}
            </span>
          </p>
          <p className="text-[20px] poppins6 text-white text-center mb-2 uppercase">
            Republican:{" "}
            <span className="poppins4">
              {!statesData[step].Republican ? 0 : statesData[step].Republican}
            </span>
          </p>
          <p className="text-[20px] poppins6 text-white text-center mb-2 uppercase">
            independent:{" "}
            <span className="poppins4">
              {!statesData[step]["Independent('Kennedy')"]
                ? 0
                : statesData[step]["Independent('Kennedy')"]}
            </span>
          </p>
          <p className="text-[20px] poppins6 text-white text-center mb-2">
            Electoral College:{" "}
            <span className="poppins4">
              {!statesData[step].electrical_collage
                ? 0
                : statesData[step].electrical_collage}
            </span>
          </p>{" "}
          
        </div>
      )} */}

      {tooltip && (
        <div className="svgModal py-5 shadow-md shadow-black px-5 rounded-[10px]">
          {statesData[step].state_image_url && (
            <img
              src={`${ImageUrl}${statesData[step].state_image_url}`}
              alt={`${step} image`}
              className=" object-cover m-auto mb-2"
            />
          )}
          <h1 className="text-[25px] orbit7 text-center text-white mb-3">
            {step}  {voteCount(step).electricalCollege}
          </h1>
          <p className="text-[20px] flex justify-between poppins6 text-white text-center mb-2 px-3">
            DEMOCRATIC:{" "}
            <span className="poppins4">
              {!statesData[step].Democratic
                ? "0%"
                : `${Math.round(statesData[step].Democratic)}%`}
            </span>
          </p>
          <p className="text-[20px] flex justify-between poppins6 text-white text-center mb-2 uppercase px-3">
            Republican:{" "}
            <span className="poppins4">
              {!statesData[step].Republican
                ? "0%"
                : `${Math.round(statesData[step].Republican)}%`}
            </span>
          </p>
          <p className="text-[20px] flex justify-between poppins6 text-white text-center mb-2 uppercase px-3">
            Independent:{" "}
            <span className="poppins4">
              {!statesData[step]["Independent('Kennedy')"]
                ? "0%"
                : `${Math.round(statesData[step]["Independent('Kennedy')"])}%`}
            </span>
          </p>
          {/* <p className="text-[20px] poppins6 text-white text-center mb-2">
            Electoral College:{" "}
            <span className="poppins4">
              {!statesData[step].electrical_collage
                ? 0
                : statesData[step].electrical_collage}
            </span>
          </p> */}
        </div>
      )}

      <svg
        className="w-full relative"
        viewBox="0 0 1020 593"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_2)">
          <mask
            id="mask0_1_2"
            maskType="luminance"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1020"
            height="593"
          >
            <path d="M1020 0H0V593H1020V0Z" fill="white " />
          </mask>
          <g mask="url(#mask0_1_2)">
            {/* ALASKA GREEN  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Alaska")}
              d="M161.1 453.7L160.8 539.1L162.4 540.1L165.5 540.3L167 539.2H169.6L169.8 542.1L176.8 548.9L177.3 551.5L180.7 549.6L181.3 549.4L181.6 546.3L183.1 544.7L184.2 544.5L186.1 543L189.2 545.1L189.8 548L191.7 549.1L192.8 551.5L196.7 553.3L200.1 559.3L202.8 563.2L205.1 565.9L206.6 569.6L211.6 571.4L216.8 573.5L217.8 577.9L218.3 581L217.3 584.4L215.5 586.7L213.9 585.9L212.4 582.8L209.7 581.3L207.9 580.2L207.1 581L208.6 583.7L208.8 587.4L207.7 587.9L205.8 586L203.7 584.7L204.2 586.3L205.5 588.1L204.7 588.9C204.7 588.9 203.9 588.6 203.4 587.9C202.9 587.3 201.3 584.5 201.3 584.5L200.3 582.2C200.3 582.2 200 583.5 199.3 583.2C198.7 582.9 198 581.7 198 581.7L199.8 579.8L198.3 578.3V573.3H197.5L196.7 576.7L195.6 577.2L194.6 573.5L194 569.8L193.2 569.3L193.5 575V576.1L192 574.8L188.4 568.8L186.3 568.3L185.7 564.6L184.1 561.7L182.5 560.6V558.3L184.6 557L184.1 556.7L181.5 557.3L178.1 554.9L175.5 552L170.7 549.4L166.7 546.8L168 543.6V542L166.2 543.6L163.3 544.7L159.6 543.6L153.9 541.2H148.4L147.8 541.7L141.3 537.8L139.2 537.5L136.5 531.7L132.9 532L129.3 533.5L129.8 538L130.9 535.1L131.9 535.4L130.4 539.8L133.6 537.1L134.2 538.7L130.3 543.1L129 542.8L128.5 540.9L127.2 540.1L125.9 541.2L123.2 539.4L120.1 541.5L118.3 543.6L114.9 545.7L110.2 545.5L109.7 543.4L113.4 542.8V541.5L111.1 540.9L112.1 538.5L114.4 534.6V532.8L114.6 532L119 529.7L120 531H122.7L121.4 528.4L117.7 528.1L112.7 530.8L110.3 534.2L108.5 536.8L107.4 539.1L103.2 540.6L100.1 543.2L99.8 544.8L102.1 545.8L102.9 547.9L100.2 551.1L93.7 555.3L85.9 559.5L83.8 560.6L78.5 561.7L73.2 564L75 565.3L73.5 566.8L73 567.9L70.3 566.9L67.1 567.1L66.3 569.4H65.3L65.6 567L62 568.3L59.1 569.3L55.7 568L52.8 569.9H49.6L47.5 571.2L45.9 572L43.8 571.7L41.2 570.6L38.9 571.2L37.9 572.2L36.3 571.1V569.2L39.4 567.9L45.7 568.5L50.1 566.9L52.2 564.8L55.1 564.2L56.9 563.4L59.6 563.6L61.2 564.9L62.2 564.6L64.5 561.9L67.6 560.9L71 560.3L72.3 560L72.9 560.5H73.7L75 556.8L79 555.3L80.9 551.6L83.2 547.1L84.8 545.6L85.1 543L83.5 544.3L80.1 544.9L79.5 542.5L78.2 542.2L77.2 543.2L77 546.1L75.5 545.9L74 540.1L72.7 541.4L71.6 540.9L71.3 539L67.3 539.2L65.2 540.3L62.6 540L64.1 538.5L64.6 535.9L64 534L65.5 533L66.8 532.8L66.2 531V526.6L65.2 525.6L64.4 527.1H58.3L56.8 525.8L56.2 521.9L54.1 518.3V517.3L56.2 516.5L56.4 514.4L57.5 513.3L56.7 512.8L55.4 513.3L54.3 510.6L55.3 505.6L59.8 502.4L62.4 500.8L64.3 497.1L67 495.8L69.6 496.9L69.9 499.3L72.3 499L75.5 496.6L77.1 497.2L78.1 497.8H79.7L82 496.5L82.8 492.1C82.8 492.1 83.1 489.2 83.8 488.7C84.4 488.2 84.8 487.7 84.8 487.7L83.7 485.8L81.1 486.6L77.9 487.4L76 486.9L72.4 485.1L67.4 484.9L63.8 481.2L64.3 477.3L64.9 474.9L62.8 473.1L60.9 469.4L61.4 468.6L68.2 468.1H70.3L71.3 469.1H71.9L71.7 467.5L75.6 466.9L78.2 467.2L79.7 468.3L78.2 470.4L77.7 471.9L80.4 473.5L85.4 475.3L87.2 474.3L84.9 469.9L83.9 466.7L84.9 465.9L81.5 464L81 462.9L81.5 461.3L80.7 457.4L77.8 452.7L75.4 448.5L78.3 446.6H81.5L83.3 447.2L87.5 447L91.2 443.4L92.3 440.3L96 437.9L97.6 438.9L100.3 438.3L104 436.2L105.1 436L106.1 436.8L110.6 436.6L113.3 433.5H114.4L118 435.9L119.9 438L119.4 439.1L120 440.2L121.6 438.6L125.5 438.9L125.8 442.6L127.7 444.1L134.8 444.7L141.1 448.9L142.6 447.9L147.8 450.5L149.9 449.9L151.8 449.1L156.6 451L161.1 453.7ZM46 482.6L48.1 487.9L47.9 488.9L45 488.6L43.2 484.6L41.4 483.1H39L38.8 480.5L40.6 478.1L41.7 480.5L43.2 482L46 482.6ZM43.4 516.1L47.1 516.9L50.8 517.9L51.6 518.9L50 522.6L46.9 522.4L43.5 518.8L43.4 516.1ZM22.7 502L23.8 504.6L24.9 506.2L23.8 507L21.7 503.9V502H22.7ZM9 575.1L12.4 572.8L15.8 571.8L18.4 572.1L18.9 573.7L20.8 574.2L22.7 572.3L22.4 570.7L25.1 570.1L28 572.7L26.9 574.5L22.5 575.6L19.8 575.1L16.1 574L11.7 575.5L10.1 575.8L9 575.1ZM57.9 570.6L59.5 572.5L61.6 570.9L60.1 569.6L57.9 570.6ZM60.8 573.6L61.9 571.3L64 571.6L63.2 573.5H60.8V573.6ZM84.4 571.7L85.9 573.5L86.9 572.4L86.1 570.5L84.4 571.7ZM93.2 559.2L94.3 565L97.2 565.8L102.2 562.9L106.6 560.3L105 557.9L105.5 555.5L103.4 556.8L100.5 556L102.1 554.9L104 555.7L107.9 553.9L108.4 552.4L106 551.6L106.8 549.7L104.1 551.6L99.4 555.2L94.6 558.1L93.2 559.2ZM135.5 539.4L137.9 537.9L136.9 536.1L135.1 537.1L135.5 539.4Z"
              fill={
                // (statesData['Alaska'].Democratic && statesData['Alaska'].Republican && statesData['Alaska']["Independent('Kennedy')"] ? (
                //     statesData['Alaska'].Democratic > statesData['Alaska'].Republican && statesData['Alaska']["Independent('Kennedy')"] ? '#ed1c24' :
                //         statesData['Alaska'].Republican > statesData['Alaska'].Democratic && statesData['Alaska']["Independent('Kennedy')"] ? '#546bed' :
                //             statesData['Alaska']["Independent('Kennedy')"] > statesData['Alaska'].Democratic && statesData['Alaska']["Independent('Kennedy')"] > statesData['Alaska'].Republican ? 'white' : 'cyan'
                // ) : (statesData['Alaska'].Democratic && statesData['Alaska'].Republican) ? (
                //     statesData['Alaska'].Democratic > statesData['Alaska'].Republican ? '#ed1c24' : '#546bed'
                // ) : (''))
                backgroundColor("Alaska")
              }
            ></path>
            <text
              x="120"
              y="500"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Alaska").electricalCollege}`}
            </text>

            {/* HAWAII CYAN  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Hawaii")}
              d="M233.1 519.301L235 515.701L237.3 515.401L237.6 516.201L235.5 519.301H233.1ZM243.3 515.601L249.4 518.201L251.5 517.901L253.1 514.001L252.5 510.601L248.3 510.101L244.3 511.901L243.3 515.601ZM274 525.601L277.7 531.101L280.1 530.801L281.2 530.301L282.7 531.601L286.4 531.401L287.4 529.901L284.5 528.101L282.6 524.401L280.5 520.801L274.7 523.701L274 525.601ZM294.2 534.501L295.5 532.601L300.2 533.601L300.8 533.101L306.9 533.701L306.6 535.001L304 536.501L299.6 536.201L294.2 534.501ZM299.5 539.701L301.4 543.601L304.5 542.501L304.8 540.901L303.2 538.801L299.5 538.501V539.701ZM306.5 538.501L308.8 535.601L313.5 538.001L317.9 539.101L322.3 541.801V543.701L318.7 545.501L313.9 546.501L311.5 545.001L306.5 538.501ZM323.1 554.101L324.7 552.801L328.1 554.401L335.7 558.001L339.1 560.101L340.7 562.501L342.6 566.901L346.6 569.501L346.3 570.801L342.4 574.001L338.2 575.501L336.7 574.901L333.6 576.701L331.2 579.901L328.9 582.801L327.1 582.601L323.5 580.001L323.2 575.501L323.8 573.101L322.2 567.401L320.1 565.601L319.9 563.001L322.2 562.001L324.3 558.901L324.8 557.901L323.2 556.101L323.1 554.101Z"
              fill={backgroundColor("Hawaii")}
            ></path>
            <text
              x="300"
              y="560"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Hawaii").electricalCollege}`}
            </text>

            {/* ALABAMA INDIGO  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Alabama")}
              d="M628.499 466.4L629.099 466.6L630.399 463.9L631.899 459.5L634.199 460.1L637.299 466.1V467.1L634.599 469L637.299 469.3L642.499 466.8L642.199 459.2L639.699 457.4L637.699 455.4L638.099 451.4L648.599 449.9L674.299 447L680.999 446.4L686.599 446.5L686.099 444.3L684.599 443.5L683.699 442.4L684.699 439.8L684.299 434.6L682.699 430.1L683.499 425L685.199 420.2L684.999 418.5L683.199 417.8L682.699 414.2L679.999 410.8L677.999 404.3L676.599 397.6L674.799 392.6L670.999 376.6L667.499 368.7L666.699 363.1L666.799 360.9L657.799 361.7L634.399 363.9L622.199 364.7L621.999 371.1L622.199 387.8L621.499 418.8L621.199 432.9L623.999 451.7L625.599 466.4H628.499Z"
              fill={backgroundColor("Alabama")}
            />
            <text
              x="650"
              y="420"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Alabama").electricalCollege}`}
            </text>

            {/* ARKANSAS BROWN  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Arkansas")}
              d="M587.3 346.1L580.9 345.4L581.8 342.3L584.9 339.7L585.5 337.4L583.7 334.5L551.8 335.7L528.5 336.4L504.9 336.7L506.4 343.6L506.5 352.1L507.9 363L508.2 401.2L510.3 402.8L513.3 401.6L516.2 402.8L516.6 412.9L541.8 412.7L568.6 411.9L569.5 410L569.2 406.2L567.5 403.1L569 401.7L567.6 399.5L568.3 397.1L569.4 391.2L572.1 388.9L571.3 386.7L575.3 381.1L577.8 380L577.7 378.3L577.2 376.6L580.1 370.8L582.6 369.7L582.8 366.4L584.9 365L585.8 360.9L584.4 356.9L588.6 354.5L588.9 352.4L590.1 348.2L591 345.1L587.3 346.1Z"
              fill={backgroundColor("Arkansas")}
            />
            <text
              x="539"
              y="380"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Arkansas").electricalCollege}`}
            </text>

            {/* ARIZONA BLUE  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Arizona")}
              d="M135.101 389.7L134.801 391.2L135.301 392.2L154.201 402.9L166.301 410.5L181.001 419.1L197.801 429.1L210.101 431.5L235.501 434.2L241.501 394.6L248.501 341.5L252.901 310.5L228.301 306.9L167.601 295.9L167.401 297L164.801 313.5L162.701 317.3L159.901 317.1L158.701 314.5L156.101 314.1L154.901 313L153.801 313.1L151.701 314.8L151.401 321.6L151.101 323.1L150.601 335.6L149.101 338L148.701 341.3L151.501 346.3L152.601 351.8L153.301 352.9L154.401 353.8L154.001 356.2L152.301 357.4L148.901 359L147.301 360.8L145.701 364.4L145.201 369.3L142.201 372.2L140.301 373.1L140.201 378.9L139.601 380.5L140.101 381.3L144.001 381.7L143.101 384.7L141.401 387.1L137.701 387.5L135.101 389.7Z"
              fill={backgroundColor("Arizona")}
            />
            <text
              x="200"
              y="370"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Arizona").electricalCollege}`}
            </text>

            {/* CALIFORNIA PURPLE  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("California")}
              d="M122.7 385.9L103 383.2L93 381.7L92.5 379.9V370.5L92.2 367.3L89.6 363.1L88.8 360.8L84.9 356.6L82 351.9L79.3 351.7L76.1 350.9L75.8 349.9L77.3 349.3L76.7 346.1L75.2 344L70.4 343.2L66.5 341.1L65.4 338.8L62.8 334L59.9 330.9H57L53.1 328.8L48.6 327L44.4 326.5L42 323.8L42.5 321.9L44.3 314.8L45.1 312.9V310.5L43.5 309.5L43 306.6L41.5 304L38.1 298.2L36.8 295.1L35.3 290.4L33.7 285.1L30.5 280.7L30 277.8L30.8 273.9H31.9L34 272.3L35.1 268.7L34.1 266L31.4 265.5L29.5 262.9L27.4 259.2L27.2 251L27.8 249.1L28.4 246.8L28.9 244.4L23.2 238.1V236L23.5 235.5L23.8 232.3L22.5 228.3L20.2 223.5L17.5 219L15.7 215.1L16.7 211.4L17.3 205.6L19.1 202.5L19.4 196L18.3 192.4L16.7 188.2L14 184L14.8 180.8L16.3 176.6L18.1 175.8L18.4 174.7L21.5 172.1L26.7 160.3L26.9 152.9L28.59 148L67.28 159.8L92.88 166.4L84.88 197.7L76.21 230.8L88.84 250L131 312.3L148.1 338.4L147.7 341.5L150.5 346.7L151.6 352.1L152.6 353.6L153.3 354.2L153.1 355.6L151.7 356.6L148.3 358.2L146.4 360.3L144.7 364.2L144.2 368.9L141.6 371.4L139.3 372.5L139.2 378.7L138.6 380.6L139.6 382.3L142.6 382.6L142.2 384.2L140.8 386.2L136.9 386.8L122.7 385.9ZM48.8 337L50.1 338.5L49.9 339.8L46.7 339.7L46.1 338.5L45.5 337H48.8ZM50.7 337L51.9 336.4L55.5 338.5L58.6 339.7L57.7 340.3L53.2 340.1L51.6 338.5L50.7 337ZM71.4 356.8L73.2 359.1L74 360.1L75.5 360.7L76.1 359.2L75.1 357.4L72.4 355.4L71.3 355.6V356.8H71.4ZM70 365.5L71.8 368.7L73 370.6L71.5 370.8L70.2 369.6C70.2 369.6 69.5 368.1 69.5 367.7V365.5H70Z"
              fill={backgroundColor("California")}
            />
            <text
              x="70"
              y="280"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("California").electricalCollege}`}
            </text>

            {/* COLORADO black  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Colorado")}
              d="M380.2 235.5L344.2 232L265.1 223.4L262.9 245.5L255.9 295.9L254 309.6L288 313.5L325.5 317.9L360.2 320.9L374.5 321.5L380.2 235.5Z"
              fill={backgroundColor("Colorado")}
            />
            <text
              x="315"
              y="280"
              textAnchor="middle"
              fill="white"
              z={999}
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Colorado").electricalCollege}`}
            </text>

            {/* CONNECTICUT SKYBLUE  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Connecticut")}
              d="M852 190.9L855.6 187.7L857.5 185.6L858.3 186.2L861 184.7L866.2 183.6L873.2 180.1L872.6 175.9L871.8 171.5L870.2 165.5L865.9 166.6L844.1 171.3L844.7 174.4L846.2 181.7V190L845.3 192.1L847 194.3L852 190.9Z"
              fill={backgroundColor("Connecticut")}
            />
            <line
              x1="890"
              y1="210"
              x2="870"
              y2="182"
              stroke="black"
              strokeWidth="2"
              className=" "
            />
            <text
              x="910"
              y="223"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight={700}
            >
              CT {` ${voteCount("Connecticut").electricalCollege}`}
            </text>

            {/* DELAWARE lightgreen */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Delaware")}
              d="M834.401 247.2L833.401 247.7L829.801 245.3L828.001 240.6L826.101 237L823.801 236L821.701 232.4L822.201 230.4L822.701 228.1L822.801 227L822.201 227.1L820.501 228.1L818.501 229.8L818.301 230.1L819.701 234.2L822.001 239.8L825.701 255.9L830.701 255.6L836.701 254.5L834.401 247.2Z"
              fill={backgroundColor("Delaware")}
            />

            <line
              x1="836"
              y1="250"
              x2="880"
              y2="275"
              stroke="black"
              strokeWidth="2"
              className=" "
            />
            <text
              x="905"
              y="285"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight={700}
            >
              DE {` ${voteCount("Delaware").electricalCollege}`}
            </text>

            {/* FLORIDA PINK  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Florida")}
              d="M750.199 445.2L744.999 444.5L744.299 445.3L745.799 449.7L745.399 454.9L741.299 453.9L741.099 451.1H736.999L731.699 451.8L699.299 453.7L691.099 453.4L689.399 451.7L686.899 447.5H680.999L674.399 448L638.999 452.2L638.699 455L640.299 456.6L643.199 458.6L643.499 467L646.799 466.4L652.799 464.3L658.799 463.8L663.199 463.2L670.799 465L678.899 468.9L680.499 470.4L683.399 471.5L684.999 473.4L685.299 476.1L688.499 474.8H692.399L695.999 472.9L699.699 469.3L702.799 469.5L703.299 468.4L702.499 467.4L702.699 465.5L706.699 464.7H709.299L712.199 466.2L716.399 467.7L718.799 471.4L721.499 472.4L722.599 475.8L725.999 477.4L727.599 480L729.499 480.6L734.699 481.9L735.999 485L738.999 488.7V498.2L737.499 502.9L737.799 505.6L739.099 510.4L740.899 514.4L741.699 513.9L743.199 509.4L740.599 508.4L740.299 507.8L741.899 507.2L746.399 508.2L746.599 509.8L743.399 515.3L741.299 517.7L744.899 521.4L747.499 524.5L750.399 529.8L753.299 533.7L755.399 538.7L757.199 539L758.799 536.9L760.599 538L763.199 542L763.799 545.6L766.899 550L767.699 548.7L771.599 549L775.199 551.3L778.599 556.5L779.399 559.9L779.699 562.8L780.799 563.8L782.099 564.3L784.499 563.3L785.999 561.7L789.899 561.5L792.999 560L795.699 556.8L795.199 554.9L794.899 552.5L795.499 550.6L795.199 548.7L797.599 547.4L797.899 544L797.299 542.2L796.799 530.2L795.499 522.6L790.999 514.4L787.399 508.6L784.799 503.3L781.899 500.4L778.999 493L779.699 491.6L780.799 490.3L779.199 487.4L775.199 483.7L770.399 478.2L766.699 471.9L761.399 462.5L757.699 452.8L755.399 445.5L750.199 445.2ZM767.899 577.9L770.299 577.3L771.599 577.1L773.099 574.8L775.399 573.2L776.699 573.7L778.399 574L778.799 575.1L775.299 576.3L771.099 577.8L768.799 579L767.899 577.9ZM781.399 572.9L782.599 574L785.299 571.9L790.599 567.7L794.299 563.8L796.799 557.2L797.799 555.5L797.999 552.1L797.299 552.6L796.299 555.4L794.799 560L791.599 565.3L787.199 569.5L783.799 571.4L781.399 572.9Z"
              fill={backgroundColor("Florida")}
            />
            <text
              x="750"
              y="500"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Florida").electricalCollege}`}
            </text>

            {/* GEORGIA #F69e1e  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Georgia")}
              d="M750.199 444.201L744.599 443.501L743.199 445.101L744.799 449.801L744.499 453.701L742.299 453.101L742.099 450.101H736.899L731.599 450.801L699.299 452.701L691.599 452.401L690.199 451.201L687.699 446.901L686.899 443.601L685.299 442.701L684.799 442.201L685.699 440.001L685.299 434.501L683.699 430.001L684.499 425.101L686.199 420.301L685.999 417.801L684.099 417.101L683.699 413.901L680.899 410.401L678.999 404.201L677.499 397.201L675.799 392.401L671.999 376.401L668.499 368.401L667.699 363.101L667.799 360.801L671.099 360.501L684.699 358.901L703.299 356.901L709.599 355.801L710.099 357.201L707.899 358.101L706.999 360.301L707.399 362.301L708.799 363.901L713.099 366.601L716.299 366.501L719.499 371.201L720.099 372.801L722.399 375.601L722.899 377.301L727.599 379.101L730.599 381.301L732.899 384.301L735.199 385.601L737.199 387.401L738.599 390.101L740.699 392.001L744.799 393.801L747.499 399.801L749.199 404.901L751.999 405.601L754.099 407.501L756.099 413.201L758.999 414.801L760.699 414.001L761.099 415.201L757.799 421.401L758.299 424.001L756.799 428.201L754.499 438.201L755.299 444.501L750.199 444.201Z"
              fill={backgroundColor("Georgia")}
            />
            <text
              x="710"
              y="420"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Georgia").electricalCollege}`}
            </text>

            {/* iowa gray  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Iowa")}
              d="M556.8 183.601L558.9 185.701L559.2 186.401L557.2 189.401L557.5 193.401L560.1 197.501L563.2 199.101L565.6 199.401L566.5 201.201L566.7 203.601L569.2 204.601L570.1 205.701L570.6 207.301L574.4 210.601L575 212.501L574.3 215.501L572.6 219.201L572 221.601L569.9 223.201L568.3 223.701L562.6 225.201L561 230.001L561.8 231.801L563.5 233.301L563.3 236.801L561.4 238.201L560.7 240.001V242.401L559.3 242.801L557.6 244.201L557.1 245.901L557.5 247.601L556.2 248.601L553.9 245.901L552.5 243.101L544.2 243.901L534.2 244.501L485 245.701L483.4 241.401L483 234.701L481.6 230.501L480.9 225.301L478.7 221.601L477.7 217.001L475 209.201L473.9 203.601L472.5 201.701L471.2 198.801L472.9 195.001L474.1 188.901L471.4 186.701L471.1 184.301L471.8 181.901L473.6 181.601L534.7 181.001L555.9 180.301L556.8 183.601Z"
              fill={backgroundColor("Iowa")}
            />
            <text
              x="500"
              y="220"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Iowa").electricalCollege}`}
            </text>

            {/* Idaho fuchsia  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Idaho")}
              d="M175.299 27.6309L170.499 45.0409L165.999 65.9009L162.599 82.1209L162.199 91.7909L163.399 96.2309L166.899 98.8909L166.699 102.801L162.799 107.201L158.299 113.801L157.399 116.701L156.199 117.801L154.399 118.601L150.099 123.901L149.699 127.001L149.299 128.101L149.899 129.101L152.499 129.001L153.599 131.301L151.199 137.101L149.999 141.301L141.199 176.601L161.899 181.101L201.399 189.001L236.199 195.101L241.099 165.901L244.899 141.801L242.199 139.401L241.799 136.801L240.999 135.701L238.899 136.701L238.199 139.301L234.999 139.801L231.099 138.201L227.299 138.301L224.799 139.001L221.399 137.501L218.999 137.701L216.599 139.701L214.599 138.601L213.899 134.601L214.599 131.701L212.099 128.801L208.799 126.201L206.099 113.101L205.999 108.401L205.699 108.301L205.499 108.701L200.399 112.201L198.699 112.001L195.799 108.601L195.599 105.501L202.599 88.3709L202.199 86.4309L198.799 85.2809L198.199 84.1009L195.599 80.6409L190.999 70.4109L187.799 68.8809L185.799 63.9309L187.099 59.3009L183.899 51.7209L188.299 30.2009L175.299 27.6309Z"
              fill={backgroundColor("Idaho")}
            />
            <text
              x="180"
              y="150"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Idaho").electricalCollege}`}
            </text>

            {/* Illinois teal */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Illinois")}
              d="M618.7 214.301L617.9 211.701L616.6 208.001L615 206.201L613.5 203.601L613.1 198.101L597.2 199.901L579.8 200.901H567.5L567.7 203.001L569.9 203.901L571 205.301L571.4 206.701L575.3 210.101L576 212.501L575.3 215.801L573.6 219.501L572.8 222.201L570.4 224.101L568.5 224.701L563.3 226.001L562 230.101L562.6 231.201L564.5 233.001L564.3 237.301L562.2 238.901L561.7 240.201V243.001L559.9 243.601L558.5 244.801L558.1 246.001L558.5 248.001L556.9 249.301L556 252.101L556.3 256.001L558.6 263.001L565.6 270.601L571.3 274.301V278.701L572 279.901L578.6 280.501L581.3 281.901L580.6 285.401L578.4 291.601L577.6 294.601L579.6 298.301L586 303.601L590.8 304.401L593 309.501L595 312.901L594.1 315.701L595.6 319.501L597.3 321.601L598.9 321.301L599.9 319.101L602.3 317.401L605.1 316.401L611.2 318.901L611.7 318.701V317.601L610.5 314.901L610.9 312.101L613.3 310.501L616.7 309.301L616.2 308.001L615.4 306.001L616.6 304.701L617.6 302.001V298.001L618 293.101L620.5 290.101L622.3 286.301L624.8 282.301L624.3 277.001L622.5 273.801L622.2 270.501L623 265.201L622.3 258.001L621.2 242.201L619.8 226.901L618.9 215.201L618.7 214.301Z"
              fill={backgroundColor("Illinois")}
            />
            <text
              x="590"
              y="260"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Illinois").electricalCollege}`}
            </text>

            {/* Indiana maroon */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Indiana")}
              d="M622.9 216.1L624.4 217.1L625.5 216.8L627.6 214.9L630.1 213.1L644.4 212L662.8 210.2L664.4 225.7L669.3 268.3L668.7 271.2L670 272.8L670.2 274.1L667.9 275.7L664.3 277.4L661.1 277.8L660.6 282.6L655.9 286.2L653 290.2L653.2 292.6L652.7 294H649.2L647.8 292.3L642.6 295.3L642.8 298.4L641.9 298.6L641.4 297.7L639 296L635.4 297.5L634 300.4L632.8 299.8L631.2 298L626.8 298.5L621.1 299.5L618.6 300.8V298.2L619 293.5L621.3 290.6L623.1 286.7L625.8 282.5L625.3 276.7L623.5 273.6L623.2 270.4L624 265.1L623.3 258L622.4 245.4L619.9 215.3L622.9 216.1Z"
              fill={backgroundColor("Indiana")}
            />
            <text
              x="643"
              y="260"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Indiana").electricalCollege}`}
            </text>

            {/* Kansas navyblue */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Kansas")}
              d="M485.9 259.501L442.1 258.901L401.5 257.701L379.8 256.801L375.5 321.601L399.8 322.601L444.5 324.701L490.8 325.301L503.4 325.001L504.1 290.001L502.9 278.901L500.4 276.901L498 273.901L495.7 270.301L496.3 267.301L498 265.901V263.801L497.2 263.101L494.6 262.901L491.1 259.501H485.9Z"
              fill={backgroundColor("Kansas")}
            />
            <text
              x="440"
              y="300"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Kansas").electricalCollege}`}
            </text>

            {/* Kentucky royalblue */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Kentucky")}
              d="M607.2 331.801L619.8 331.101L619.9 327.001H624.2L654.6 323.801L699.7 319.501L705.3 315.901L709.2 313.801L709.3 311.901L715.3 304.101L719.4 300.501L721.5 298.101L718.2 296.101L715.7 293.401L712.7 289.601L712.2 287.401L709.6 286.001L708.7 284.101L708.5 278.001L705.9 276.001L704 274.901L703.5 272.601L702.2 272.801L700.2 274.001L697.7 276.701L695.8 275.001L693.3 274.501L690.9 275.901H688.6L686.8 273.901L681.2 273.801L679.4 269.301L676.5 267.801L674.4 268.601L670.2 268.801L669.7 270.901L670.9 272.401L671.2 274.501L668.4 276.501L664.6 278.301L662 278.701L661.5 283.201L656.6 286.801L654 290.501L654.2 292.701L653.3 295.001L648.8 294.901L647.5 293.601L643.6 295.801L643.8 299.101L641.4 299.701L640.6 298.301L638.9 297.101L636.2 298.201L634.4 301.701L632.2 300.701L630.8 299.101L627.1 299.501L621.5 300.501L618.7 301.801L617.5 305.201L616.5 306.201L618 309.901L613.8 311.301L611.9 312.701L611.5 314.901L612.7 317.301V319.501L611.1 319.901L605 317.401L602.7 318.301L600.7 319.701L599.9 321.501L601.6 323.901L600.7 325.701L600.6 329.001L598.2 330.301L596.1 332.001L607.2 331.801Z"
              fill={backgroundColor("Kentucky")}
            />
            <text
              x="670"
              y="310"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Kentucky").electricalCollege}`}
            </text>

            {/* Louisiana magenta */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Louisiana")}
              d="M526.9 485.9L535 485.6L545.3 489.2L551.8 490.3L555.5 488.8L558.7 489.9L561.9 490.9L562.7 488.8L559.5 487.7L556.9 488.2L554.2 486.6L555 485.1L558.1 484.1L559.9 485.6L561.7 484.6L564.9 485.2L566.4 487.6L566.7 489.9L571.2 490.2L573 492L572.2 493.6L570.9 494.4L572.5 496L580.9 499.6L584.5 498.3L585.5 495.9L588.1 495.3L589.9 493.8L591.2 494.8L592 497.7L589.7 498.5L590.3 499.1L593.7 497.8L596 494.4L596.8 493.9L594.7 493.6L595.5 492L595.3 490.5L597.4 490L598.5 488.7L599.1 489.5L599.7 492.6L603.9 493.2L607.9 495.1L608.9 496.6H611.8L612.9 497.6L615.2 494.5V493H613.9L610.5 490.3L604.7 489.5L601.5 487.2L602.6 484.5L604.9 484.8L605.1 484.2L603.3 483.2V482.7H606.5L608.3 479.6L607 477.7L606.7 475L605.2 475.2L603.3 477.3L602.7 479.9L599.6 479.3L598.6 477.5L600.4 475.6L602.3 473.9L600.1 467.4L596.7 464L597.7 456.7L597.5 456.2L596.2 456.4L563.1 457.8L562.3 455.4L563.1 446.9L571.7 432.1L570.8 429.5L572.2 429.1L572.6 427.1L570.4 425.1L570.5 423.2L568.5 418.7L568.1 413.6L568.2 412.9L541.8 413.7L516.6 413.8L517 423.5L517.7 433L518.2 436.7L520.8 441.2L521.7 445.6L526 451.6L526.3 454.7L526.9 455.5L526.2 463.8L523.4 468.4L524.6 470.8L524.1 473.4L523.3 480.7L522 483.7L522.2 487.4L526.9 485.9Z"
              fill={backgroundColor("Louisiana")}
            />
            <text
              x="545"
              y="460"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Louisiana").electricalCollege}`}
            </text>

            {/* Massachusetts firebrick */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Massachusetts")}
              d="M887.499 172.5L886.999 170.2L887.799 168.7L890.699 167.2L891.499 170.3L890.999 172.1L888.599 173.6V174.6L890.499 173.1L894.399 168.6L898.299 166.7L902.499 165.2L902.199 162.8L901.199 159.9L899.299 157.5L897.499 156.7L895.399 156.9L894.899 157.4L895.899 158.7L897.399 157.9L899.499 159.5L900.299 162.2L898.499 164L896.199 165L892.599 164.5L888.699 158.5L886.399 155.9H884.599L883.499 156.7L881.599 154.1L881.899 152.6L884.299 147.4L881.399 143L877.699 144.8L875.899 147.7L857.599 152.4L843.799 154.9L843.199 165.5L843.899 170.4L865.899 165.6L877.099 162.8L879.099 164.4L882.499 168.7L885.399 173.4L887.499 172.5ZM899.999 173.9L902.199 173.2L902.699 171.5L903.699 171.6L904.699 173.9L903.399 174.4L899.499 174.5L899.999 173.9ZM890.599 174.7L892.899 172.1H894.499L896.299 173.6L893.899 174.6L891.699 175.6L890.599 174.7Z"
              fill={backgroundColor("Massachusetts")}
            />
            {/* <text
            className=" "
              x="870"
              y="160"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Massachusetts").electricalCollege}`}
            </text> */}

            <line
              x1="920"
              y1="155"
              x2="890"
              y2="155"
              stroke="black"
              strokeWidth="2"
              className=" "
            />

            <text
              x="950"
              y="160"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight="700"
            >
              MA {voteCount("Massachusetts").electricalCollege}
            </text>

            {/* Maryland khaki */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Maryland")}
              d="M834.8 264.1L836.5 260.3L837 255.5L830.7 256.6L824.9 256.9L821.1 240.1L818.8 234.6L817.3 230L795.1 234.3L757.5 241.9L759.5 252.3L764.3 247.4L766.8 246.7L768.2 245.2L770 242.5L771.6 243.2L774.2 243L776.8 240.9L778.8 239.4L780.9 238.8L782.4 239.9L785.1 241.3L787 243.1L788.3 244.5L793.1 246.1L792.5 249L798.3 251.1L800.4 248.5L804.1 251L802 254.3L801.3 257.6L799.5 260.2V262.3L799.8 263.1L801.8 264.4L805.2 265.5L809.5 265.4L812.6 266.4L814.7 266.7L815.7 264.6L814.2 262.5V260.7L811.8 258.6L809.7 253.1L811 247.8L810.8 245.7L809.5 244.4C809.5 244.4 811 242.8 811 242.1C811 241.5 811.5 240 811.5 240L813.4 238.7L815.3 237.1L815.8 238.1L814.3 239.7L813 243.4L813.3 244.5L815.1 244.8L815.6 250.3L813.5 251.3L813.8 254.9L814.3 254.7L815.4 252.8L817 254.6L815.4 255.9L815.1 259.3L817.7 262.7L821.6 263.2L823.2 262.4L826.4 266.6L827.4 267L834.8 264.1ZM820.3 264.3L821.4 266.8L821.6 268.6L822.7 270.5C822.7 270.5 823.6 269.6 823.6 269.3C823.6 269 822.9 266.2 822.9 266.2L822.2 263.9L820.3 264.3Z"
              fill={backgroundColor("Maryland")}
            />
            <line
              x1="816"
              y1="250"
              x2="870"
              y2="310"
              stroke="black"
              strokeWidth="2"
              className=" "
            />
            <text
              x="900"
              y="320"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight={700}
            >
              ML {` ${voteCount("Maryland").electricalCollege}`}
            </text>

            {/* Maine Lavender  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Maine")}
              d="M865.8 91.9004L867.3 92.3004V89.7004L868.1 84.2004L870.7 79.5004L872.2 75.5004L870.3 73.1004V67.1004L871.1 66.1004L871.9 63.4004L871.7 61.9004L871.5 57.1004L873.3 52.3004L876.2 43.4004L878.3 39.2004H879.6L880.9 39.4004V40.5004L882.2 42.8004L884.9 43.4004L885.7 42.6004V41.6004L889.7 38.7004L891.5 36.9004L893 37.1004L899 39.5004L900.9 40.5004L910 70.4004H916L916.8 72.3004L917 77.1004L919.9 79.4004H920.7L920.9 78.9004L920.4 77.8004L923.2 77.3004L925.1 79.4004L927.4 83.1004V85.0004L925.3 89.7004L923.4 90.3004L920 93.4004L915.2 98.9004H913.9C913.3 98.9004 912.9 96.8004 912.9 96.8004L911.1 97.0004L910.1 98.5004L907.7 100L906.7 101.5L908.3 103L907.8 103.6L907.3 106.3L905.4 106.1V104.5L905.1 103.2L903.6 103.5L901.8 100.3L899.7 101.6L901 103.1L901.3 104.2L900.5 105.5L900.8 108.6L901 110.2L899.4 112.8L896.5 113.3L896.2 116.2L890.9 119.3L889.6 119.8L888 118.3L884.9 121.9L885.9 125.1L884.4 126.4L884.2 130.8L883.1 137.1L880.9 136.2L880.4 133.1L876.4 132L876.2 129.5L864.5 92.0704L865.8 91.9004ZM902.3 107.5L903.8 106L905.2 107.1L905.8 109.5L904.1 110.4L902.3 107.5ZM909 101.6L910.8 103.5C910.8 103.5 912.1 103.6 912.1 103.3C912.1 103 912.3 101.3 912.3 101.3L913.2 100.5L912.4 98.7004L910.4 99.4004L909 101.6Z"
              fill={backgroundColor("Maine")}
            />
            <text
              x="890"
              y="80"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Maine").electricalCollege}`}
            </text>

            {/* Michigan turquoise */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Michigan")}
              d="M644.5 211L663.6 209.1L663.8 210.2L673.7 208.7L685.7 207L685.8 206.4L686 204.9L688.1 201.2L690.1 199.5L689.9 194.4L691.5 192.8L692.6 192.5L692.8 188.9L694.3 185.9L695.4 186.5L695.6 187.1L696.4 187.3L698.3 186.3L697.9 177.2L694.7 169L692.4 159.9L690 156.7L687.4 154.9L685.8 156L681.9 157.8L680 162.8L677.3 166.5L676.2 167.1L674.7 166.5C674.7 166.5 672.1 165 672.3 164.4C672.5 163.8 672.8 159.4 672.8 159.4L676.2 158.1L677 154.7L677.6 152.1L680 150.5L679.7 140.5L678.1 138.2L676.8 137.4L676 135.3L676.8 134.5L678.4 134.8L678.6 133.2L676 131L674.7 128.4H672.1L667.6 126.9L662.1 123.5H659.4L658.8 124.1L657.8 123.6L654.7 121.3L651.8 123.1L648.9 125.4L649.2 129L650.2 129.3L652.3 129.8L652.8 130.6L650.2 131.4L647.6 131.7L646.1 133.5L645.8 135.6L646.1 137.2L646.4 142.7L642.8 144.8L642.2 144.6V140.4L643.5 138L644.1 135.6L643.3 134.8L641.4 135.6L640.4 139.8L637.7 140.9L635.9 142.8L635.7 143.8L636.3 144.6L635.7 147.2L633.4 147.7V148.8L634.2 151.2L633.1 157.3L631.5 161.3L632.1 166L632.6 167.1L631.8 169.5L631.5 170.3L631.2 173L634.8 179L637.7 185.5L639.2 190.3L638.4 195L637.4 201L635 206.2L634.7 208.9L631.5 212L644.5 211ZM611.2 138.6L609.9 137.5L608.1 127.1L604.4 125.8L602.7 123.5L590.1 120.7L587.3 119.6L579.2 117.4L571.4 116.4L567.5 111.1L568.2 110.6L570.9 109.8L574.5 107.5V106.5L575.1 105.9L581.1 104.9L583.5 103L587.9 100.9L588.1 99.6002L590 96.7002L591.8 95.9002L593.1 94.1002L595.4 91.8002L599.8 89.4002L604.5 88.9002L605.6 90.0002L605.3 91.0002L601.6 92.0002L600.1 95.1002L597.8 95.9002L597.3 98.3002L594.9 101.5L594.6 104.1L595.4 104.6L596.4 103.5L600 100.6L601.3 101.9H603.6L606.8 102.9L608.3 104L609.8 107.1L612.5 109.8L616.4 109.6L617.9 108.6L619.5 109.9L621.1 110.4L622.4 109.6H623.5L625.1 108.6L629.1 105L632.5 103.9L639.1 103.6L643.6 101.7L646.2 100.4L647.7 100.6V106.3L648.2 106.6L651.1 107.4L653 106.9L659.1 105.3L660.2 104.2L661.7 104.7V111.7L664.9 114.8L666.2 115.4L667.5 116.4L666.2 116.7L665.4 116.4L661.7 115.9L659.6 116.5L657.3 116.3L654.1 117.8H652.3L646.5 116.5L641.3 116.7L639.4 119.3L632.4 119.9L630 120.7L628.9 123.8L627.6 124.9L627.1 124.7L625.6 123.1L621.1 125.5H620.5L619.4 123.9L618.6 124.1L616.7 128.5L615.7 132.5L612.5 139.4L611.2 138.6ZM581.6 82.1002L583.4 80.0002L585.6 79.2002L591 75.3002L593.3 74.7002L593.8 75.2002L588.7 80.3002L585.4 82.2002L583.3 83.1002L581.6 82.1002ZM667.8 114.2L668.4 116.7L671.6 116.9L672.9 115.7C672.9 115.7 672.8 114.2 672.5 114.1C672.2 113.9 670.9 112.2 670.9 112.2L668.7 112.4L667.1 112.6L666.8 113.7L667.8 114.2Z"
              fill={backgroundColor("Michigan")}
            />
            <text
              x="655"
              y="180"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Michigan").electricalCollege}`}
            </text>

            {/* Minnesota #ffc101  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Minnesota")}
              d="M464.601 66.7904L464.001 70.7004V80.9704L465.601 86.0004L467.501 89.3204L468.001 99.2504L469.801 112.7L471.601 120L472.001 126.4V131.7L470.401 133.5L468.601 134.8V136.3L469.501 138L473.601 141.5L474.301 144.7V180.6L534.601 180L555.801 179.3L555.301 173.3L553.501 171.2L546.301 166.6L542.701 161.3L539.301 160.4L537.301 157.6H534.101L530.601 153.8L530.101 146.8L530.201 142.9L531.701 139.9L531.001 137.2L528.201 134.1L530.401 128L535.801 124L537.001 122.6L536.801 114.6L537.001 111.6L539.601 108.6L543.401 105.7L544.701 105.5L549.201 100.5L551.001 99.7004L553.301 95.8004L555.701 92.2004L558.801 89.6004L563.601 87.6004L572.801 83.5004L576.701 81.7004L577.301 79.4004L572.901 79.8004L572.201 80.9004H571.601L569.801 77.8004L560.901 78.1004L559.901 78.9004H558.901L558.401 77.6004L557.601 75.8004L555.001 76.3004L551.801 79.5004L550.201 80.3004H547.101L544.501 79.3004V77.2004L543.201 77.0004L542.701 77.5004L540.101 76.2004L539.601 73.3004L538.101 73.8004L537.601 74.8004L535.201 74.3004L529.901 71.9004L526.001 69.3004H523.101L521.801 68.3004L519.501 68.9004L518.401 70.0004L518.101 71.3004H513.301V69.2004L507.001 68.9004L506.701 67.4004H501.901L500.301 65.8004L498.801 59.7004L498.001 54.2004L496.101 53.4004L493.801 52.9004L493.201 53.1004L492.901 61.3004L462.801 61.2704L464.601 66.7904Z"
              fill={backgroundColor("Minnesota")}
            />
            <text
              x="500"
              y="133"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Minnesota").electricalCollege}`}
            </text>

            {/* Missouri hotpink */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Missouri")}
              d="M593.1 338.701L593.6 332.801L597.8 329.401L599.7 328.401V325.501L600.4 323.901L599.3 322.301L596.9 322.601L594.8 320.101L593.1 315.601L594 313.001L592 309.801L590.2 305.201L585.6 304.501L578.8 298.901L576.6 294.701L577.4 291.401L579.6 285.401L580.2 282.401L578.3 281.401L571.4 280.801L570.3 278.901V274.801L565 271.301L557.8 263.501L555.5 256.201L555 252.001L555.7 249.601L553.1 246.501L551.9 244.101L544.2 244.901L534.2 245.501L485.4 246.701L486.7 249.301L486.6 251.501L488.9 255.101L491.9 259.001L495 262.001L497.6 262.201L499 263.301V266.201L497.2 267.801L496.7 270.101L498.8 273.301L501.2 276.301L503.8 278.401L505.1 290.001L504.3 330.001L504.8 335.701L528.5 335.501L551.8 334.801L584.3 333.501L586.5 337.201L585.7 340.301L582.6 342.801L582.1 344.601L587.3 345.101L591.4 344.001L593.1 338.701Z"
              fill={backgroundColor("Missouri")}
            />
            <text
              x="537"
              y="300"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Missouri").electricalCollege}`}
            </text>

            {/* Mississippi coral */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Mississippi")}
              d="M604.301 472.501L606.901 468.301L608.701 469.101L615.501 467.201L617.601 467.501L619.101 468.301H624.301L624.701 466.701L623.001 451.901L620.201 432.901L621.201 387.801L621.001 371.101L621.201 364.801L616.401 365.101L596.801 366.701L583.801 367.101L583.601 370.301L580.801 371.601L578.201 376.701L578.701 378.301L578.801 380.701L575.901 381.801L572.401 386.901L573.201 389.201L570.201 391.701L569.201 397.401L568.601 399.301L570.201 401.801L568.701 403.201L570.201 406.001L570.501 410.201L569.301 412.701L569.101 413.601L569.501 418.601L571.501 423.101L571.401 424.801L573.701 426.801L573.001 429.901L572.101 430.201L572.701 432.101L564.101 447.101L563.301 455.301L563.801 456.801L588.001 456.101L596.201 455.401L598.101 455.101L598.701 456.501L597.701 463.601L601.001 466.901L603.201 473.301L604.301 472.501Z"
              fill={backgroundColor("Mississippi")}
            />
            <text
              x="590"
              y="430"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Mississippi").electricalCollege}`}
            </text>

            {/* Montana orchid */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Montana")}
              d="M361.1 70.7702L355.8 127.9L354.5 143.1L295.4 136.5L246.4 129.4L245 140.6L243.1 138.9L242.7 136.4L241.4 134.5L238.1 136L237.4 138.5L235.1 138.8L231.3 137.2L227.2 137.3L224.8 138L221.6 136.5L218.6 136.7L216.5 138.6L215.6 138L214.9 134.6L215.6 131.4L212.9 128.2L209.6 125.7L207.1 113.1L207 107.8L205.4 107L204.8 108L200.3 111.2L199.1 111.1L196.8 108.3L196.6 105.5L203.6 88.3502L203 85.6802L199.5 84.5602L199.1 83.6502L196.4 80.1502L191.8 69.7402L188.6 68.1602L186.8 63.9002L188.1 59.2702L184.9 51.7002L189.3 30.4102L222 37.3002L240.4 40.7002L272.7 46.0002L302 50.0002L331.2 53.5002L362 56.5702L361.1 70.7702Z"
              fill={backgroundColor("Montana")}
            />
            <text
              x="270"
              y="97"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Montana").electricalCollege}`}
            </text>

            {/* North Carolina darkslategray */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("North Carolina")}
              d="M786.7 357.7L774 350L770.9 349.2L754.3 351.3L752.7 348.3L749.9 346.1L733.2 346.6L725.8 347.5L716.6 352L709.8 354.7L703.3 355.9L689.9 357.3L690 353.2L691.7 351.9L694.4 351.2L695.1 347.4L699 344.9L702.9 343.4L707.4 339.7L711.8 337.4L712.5 334.2L716.6 330.4L717.3 331.4L719.8 331.6L722.2 328L723.9 327.6L726.5 327.9L728.3 323.9L730.8 321.5L731.3 319.7L731.4 316.2L735.8 316.3L774.3 310.7L831.8 298.4L833.8 303.2L837.4 309.7L839.8 312.1L840.4 314.4L838 314.6L838.8 315.2L838.5 319.4L835.9 320.7L835.3 322.8L834 325.7L830.3 327.3L827.9 327L826.4 326.8L824.8 325.5L825.1 326.8V327.8H827L827.8 329.1L825.9 335.4H830.1L830.7 337L833 334.7L834.3 334.2L832.4 337.8L829.3 342.6H828L826.9 342.1L824.2 342.7L819 345.1L812.5 350.4L809.1 355.1L807.2 361.6L806.7 364L802 364.5L796.9 366L786.7 357.7ZM836 331.5L838.6 329L841.8 326.4L843.3 325.8L843.5 323.8L842.9 317.7L841.4 315.4L840.8 313.5L841.5 313.3L844.2 318.8L844.6 323.2L844.4 326.6L841 328.1L838.2 330.5L837.1 331.7L836 331.5Z"
              fill={backgroundColor("North Carolina")}
            />
            <text
              x="790"
              y="340"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={600}
            >
              {` ${voteCount("North Carolina").electricalCollege}`}
            </text>

            {/* North Dakota thistle */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("North Dakota")}
              d="M471.001 126.401L470.601 120.201L468.801 112.901L467.001 99.2906L466.501 89.5906L464.601 86.4106L463.001 81.0906V70.6806L463.601 66.8306L461.801 61.2906L433.201 60.7006L414.601 60.1006L388.101 58.8006L362.901 56.6406L362.001 71.0606L357.301 122.001L414.101 125.901L471.001 127.601V126.401Z"
              fill={backgroundColor("North Dakota")}
            />
            <text
              x="410"
              y="100"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("North Dakota").electricalCollege}`}
            </text>

            {/* Nebraska goldenrod */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Nebraska")}
              d="M470.3 204.3L469.3 202L468.8 200.4L465.9 198.8L461.1 197.3L458.9 196.1L456.3 196.2L452.6 196.6L448.4 197.8L442.4 193.7L440.2 191.7L429.5 192.3L388 189.9L352.4 187.7L348.1 231.4L381.2 234.7L379.8 255.8L401.5 256.8L442.1 258L485.9 258.6H490.4L488.2 255.6L485.6 251.7L485.7 249.4L484.3 246.7L482.4 241.5L482 234.8L480.6 230.7L480.1 225.7L477.8 222L476.8 217.3L474 209.4L473 204.1L470.3 204.3Z"
              fill={backgroundColor("Nebraska")}
            />
            <text
              className="text-center"
              x="415"
              y="230"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Nebraska").electricalCollege}`}
            </text>

            {/* New Hampshire red  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("New Hampshire")}
              d="M881.7 141.301L882.8 138.101L880.1 136.901L879.6 133.801L875.5 132.701L875.2 129.701L863.5 92.2207L862.8 92.3007L862.2 93.9007L861.6 93.4007L860.6 92.4007L859.1 94.3007L858.9 96.5907L859.4 105.001L861.3 107.801V112.101L857.4 116.901L855 117.801V118.501L856.1 120.401V129.001L855.3 138.201L855.1 142.901L856.1 144.301L855.9 149.001L855.4 150.501L856.4 151.601L861.5 150.401L875.3 146.901L877 144.001L881 142.101L881.7 141.301Z"
              fill={backgroundColor("New Hampshire")}
            />
            <line
              x1="855"
              y1="40"
              x2="862"
              y2="90"
              stroke="black"
              strokeWidth="2"
              className=" "
            />
            <text
              x="850"
              y="35"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight={700}
            >
              NH {` ${voteCount("New Hampshire").electricalCollege}`}
            </text>

            {/* NewJersey mistyrose */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("New Jersey")}
              d="M823.7 228.3L823.8 226.8L826.5 225.5L828.2 222.7L829.9 220.3L833.2 217.1V215.9L827.1 211.8L826.1 209.1L823.4 208.8L823.3 207.9L822.6 205.7L824.8 204.6L825 201.7L823.7 200.4L823.9 199.2L825.8 196.1V193L828.3 189.9L833.9 192.4L840.3 194.3L842.8 195.5L842.9 197.3L842.4 200L842.8 204.5L840.7 206.4L839.6 207.4L840.1 207.9L842.8 207.6L843.9 206.8L845.5 210.2L845.7 219.6L846.3 220.7L845.2 226.2L842.1 232.7L839.4 236.7L838.6 241.5L836.5 243.9H835.7L835.4 241.2L836.2 240.2L836 238.7L832 238.1L827.2 235.8L824 232.9L823 230.9L823.7 228.3Z"
              fill={backgroundColor("New Jersey")}
            />
            <line
              x1="846"
              y1="220"
              x2="870"
              y2="235"
              stroke="black"
              strokeWidth="2"
              className=" "
            />
            <text
              x="900"
              y="245"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight={700}
            >
              NJ {` ${voteCount("New Jersey").electricalCollege}`}
            </text>

            {/* NewMexico orange */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("New Mexico")}
              d="M270.2 429.401L253.5 426.801L252.3 436.401L236.5 434.401L242.5 394.701L249.5 341.501L253.9 310.601L287.9 314.501L325.3 318.901L357.3 321.701L357 332.501L355.6 332.401L348.2 430.101L319.8 428.301L281.7 424.601L282.4 430.901L270.2 429.401Z"
              fill={backgroundColor("New Mexico")}
            />
            <text
              x="300"
              y="380"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("New Mexico").electricalCollege}`}
            </text>

            {/* Nevada indianred */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Nevada")}
              d="M123.1 173.6L161.8 182.1L187.8 187.3L177.2 240.4L171.8 270.2L168.5 285.7L166.4 296.8L163.8 313.2L162.1 316.3L160.5 316.2L159.3 313.6L156.5 313.1L155.2 312L153.4 312.1L152.5 312.9L150.7 314.2L150.4 321.5L150.1 323L149.6 335.4L148.5 337.2L131.8 311.7L89.6995 249.6L77.2695 230.6L85.8195 198L93.8295 166.7L123.1 173.6Z"
              fill={backgroundColor("Nevada")}
            />
            <text
              x="130"
              y="235"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Nevada").electricalCollege}`}
            </text>

            {/* Newyork tomato */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("New York")}
              d="M843.4 200.001L843.9 197.301L843.7 194.901L840.7 193.401L834.2 191.401L828.2 188.801L827.6 188.401L824.9 188.101L822.9 186.601L820.8 180.701L817.5 180.201L815.1 177.801L776.7 185.901L745.1 191.901L744.6 185.401L746.2 184.201L747.5 183.101L748.5 181.501L750.3 180.401L752.2 178.601L752.7 177.001L754.8 174.301L755.9 173.301L755.7 172.301L754.4 169.201L752.6 169.001L750.7 162.901L753.6 161.101L758 159.601L762 158.301L765.2 157.801L771.5 157.601L773.4 158.901L775 159.101L777.1 157.801L779.7 156.701L784.9 156.201L787 154.401L788.8 151.201L790.4 149.301H792.5L794.4 148.201L794.6 145.901L793.1 143.801L792.8 142.301L793.9 140.201V138.701H792.1L790.3 137.901L789.5 136.801L789.3 134.201L795.1 128.701L795.7 127.901L797.2 125.001L800.1 120.501L802.8 116.801L804.9 114.401L807.3 112.601L810.4 111.401L815.9 110.101L819.1 110.301L823.6 108.801L831 106.601L831.7 111.501L834.1 118.001L834.9 123.001L833.9 127.201L836.5 131.701L837.3 133.701L836.4 136.901L840.1 138.601L842.8 148.801V154.601L842.2 165.501L843 170.901L843.7 174.501L845.2 181.801V189.901L844.1 192.201L846.2 194.901L846.7 195.801L844.8 197.601L845.1 198.901L846.4 198.601L847.9 197.301L850.2 194.701L851.3 194.101L852.9 194.701L855.2 194.901L863.1 191.001L866 188.301L867.3 186.801L871.5 188.401L868.1 192.001L864.2 194.901L857.1 200.201L854.5 201.201L848.7 203.101L844.7 204.201L843.7 203.801L843.4 200.001Z"
              fill={backgroundColor("New York")}
            />
            <text
              x="800"
              y="170"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("New York").electricalCollege}`}
            </text>

            {/* Ohio dimgray */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Ohio")}
              d="M663.801 211.2L665.501 226.7L670.301 267.8L674.201 267.6L676.501 266.8L680.101 268.6L681.801 272.8L687.201 272.9L689.001 274.9H690.701L693.101 273.5L696.201 274L697.701 275.3L699.501 273.3L701.801 271.9L704.201 271.5L704.801 274.2L706.401 275.2L709.001 277.2L709.801 277.4L711.801 277.3L713.001 276.7V274.6L714.701 273.1L714.801 268.3L715.901 264.1L717.801 262.8L718.801 263.5L719.801 264.6L720.501 264.8L720.901 264.4L720.001 261.7V259.5L721.101 258.1L723.601 254.5L724.901 253L727.101 253.5L729.201 252L732.201 248.7L734.401 245L734.601 239.6L735.101 234.6V230L733.901 226.8L735.101 225L736.401 223.8L735.801 221L731.501 195.4L725.301 199.1L721.401 201.4L718.001 205.1L714.001 209L710.801 209.8L707.901 210.3L702.401 212.9L700.301 213.1L696.901 210L691.701 210.6L689.101 209.1L686.901 207.8L663.801 211.2Z"
              fill={backgroundColor("Ohio")}
            />
            <text
              x="700"
              y="245"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Ohio").electricalCollege}`}
            </text>

            {/* Oklahoma forestgreen */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Oklahoma")}
              d="M411.9 334.901L410.1 359.201L409.2 377.201L409.4 378.801L413.4 382.401L415.1 383.301H416L416.9 381.201L418.4 383.101L420 383.201L420.3 383.001L420.5 381.901L423.3 383.301L422.9 386.801L426.7 387.301L429.2 388.301L433.4 388.901L435.7 390.501L438.2 388.801L441.7 389.501L443.9 392.601L445.1 392.701V395.001L447.2 395.701L449.7 393.601L451.5 394.201L454.2 394.301L454.9 396.601L459.3 398.401L461 398.101L462.9 393.901H464.2L465.3 396.001L469.5 396.801L472.9 398.101L475.9 398.901L477.5 398.201L478.2 395.501H482.7L484.6 396.401L487.3 394.501H488.7L489.3 395.901H492.9L494.9 394.101L497.2 394.701L498.9 396.901L501.9 398.601L505.3 399.501L507.2 400.701L506.9 363.101L505.5 352.201L505.4 343.601L503.9 337.001L503.3 330.201L503.4 325.901L490.8 326.201L444.5 325.701L399.8 323.601L358.3 321.801L357.9 332.501L411.9 334.901Z"
              fill={backgroundColor("Oklahoma")}
            />
            <text
              x="450"
              y="360"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Oklahoma").electricalCollege}`}
            </text>

            {/* oregon yellow */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Oregon")}
              d="M67.4392 158.901L95.6792 166.101L123.199 172.601L140.199 176.301L148.999 141.201L150.199 136.801L152.599 131.301L151.899 130.001L149.399 130.101L148.099 128.301L148.699 126.801L149.099 123.501L153.799 117.801L155.699 116.901L156.599 116.101L157.299 113.401L158.099 112.301L161.999 106.601L165.699 102.601L165.899 99.3406L162.499 96.8506L161.299 92.3006L148.199 88.4706L132.899 85.0006L118.099 85.3706L116.999 84.0606L111.899 85.9006L107.399 85.4206L104.999 83.8406L103.699 84.3806L99.0192 84.0906L97.0592 82.6606L92.2192 80.8906L91.1192 80.8206L86.6692 79.5506L84.9092 81.0706L78.6492 80.8306L73.3392 76.9806L73.5492 67.7006L71.4992 64.2006L67.3992 63.6006L66.6992 61.1006L64.2992 60.6006L58.4992 62.7006L56.1992 69.2006L52.9992 79.2006L49.7992 85.7006L44.7992 99.8006L38.2992 113.401L30.1992 126.001L28.2992 128.901L27.4992 137.501L26.1992 143.501L28.9092 147.001L67.4392 158.901Z"
              fill={backgroundColor("Oregon")}
            />
            <text
              x="90"
              y="130"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Oregon").electricalCollege}`}
            </text>

            {/* pennsylvania mediumorchid */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Pennsylvania")}
              d="M736.6 192.201L737.9 191.701L743.6 186.201L744.3 193.101L777.8 186.601L814.7 178.801L817 181.101L820.1 181.501L822.1 187.101L824.5 189.001L827.3 189.401L827.4 189.501L824.8 192.701V195.801L822.9 198.901L822.7 200.801L824 202.101L823.8 204.001L821.4 205.101L822.4 208.501L822.6 209.601L825.4 209.901L826.3 212.401L832.2 216.301V216.701L829.1 219.701L827.6 221.901L825.9 224.701L823.2 225.901L821.8 226.201L819.7 227.501L818.1 228.901L795.7 233.201L757 241.001L745.7 242.401L741.8 243.101L736.7 220.701L732.4 194.801L736.6 192.201Z"
              fill={backgroundColor("Pennsylvania")}
            />
            <text
              x="790"
              y="220"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Pennsylvania").electricalCollege}`}
            </text>

            {/* Rhode island lime */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Rhode Island")}
              d="M873.599 175.701L872.799 171.301L871.199 165.301L876.899 163.801L878.399 165.101L881.799 169.401L884.599 173.801L881.799 175.201L880.499 175.001L879.399 176.801L876.999 178.701L874.199 179.801L873.599 175.701Z"
              fill={backgroundColor("Rhode Island")}
            />
            <line
              x1="910"
              y1="190"
              x2="880"
              y2="175"
              stroke="black"
              strokeWidth="2"
              className=" "
            />
            <text
              x="930"
              y="200"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight={700}
            >
              RI {` ${voteCount("Rhode Island").electricalCollege}`}
            </text>

            {/* SouthCarolina #698DC5  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("South Carolina")}
              d="M759 413.6L756.9 412.6L755 407L752.5 404.7L750 404.2L748.5 399.6L745.5 393.1L741.3 391.3L739.4 389.5L738.2 386.9L735.8 384.9L733.5 383.6L731.3 380.7L728.1 378.3L723.7 376.6L723.3 375.2L721 372.4L720.5 370.9L716.7 365.5L713.3 365.6L709.4 363.1L708.2 361.9L708 360.5L708.6 358.9L711.3 357.6L710.5 355.6L716.9 352.9L726.1 348.4L733.2 347.5L749.6 347L751.9 348.9L753.7 352.4L758.3 351.6L770.9 350.1L773.6 350.9L786.1 358.3L796.2 366.6L790.9 372L788.3 378.1L787.8 384.4L786.2 385.2L785.1 387.9L782.7 388.5L780.6 392.1L777.9 394.8L775.6 398.2L774 399L770.4 402.4L767.5 402.6L768.5 405.8L763.5 411.1L761.2 412.7L759 413.6Z"
              fill={backgroundColor("South Carolina")}
            />
            <text
              x="750"
              y="380"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("South Carolina").electricalCollege}`}
            </text>

            {/* SouthDakota #DE0100  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("South Dakota")}
              d="M471 181.1L470.1 184.3L470.5 187.3L473.1 189.3L471.9 194.7L470.1 198.8L471.6 202.1L472.3 203.2L471 203.3L470.3 201.7L469.7 199.7L466.4 197.9L461.6 196.4L459.1 195.1L456.2 195.2L452.3 195.6L448.5 196.8L443.2 193L440.5 190.6L429.6 191.4L388.1 189L352.5 186.8L354 162L356.8 128L357.2 123L414.1 126.9L471 128.6V131.3L469.7 132.8L467.7 134.3L467.6 136.5L468.7 138.7L472.8 142.1L473.3 144.8V180.7L471 181.1Z"
              fill={backgroundColor("South Dakota")}
            />
            <text
              x="410"
              y="165"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("South Dakota").electricalCollege}`}
            </text>

            {/* Tennessee lightcyan */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Tennessee")}
              d="M670.8 359.6L657.7 360.8L634.4 363L596.8 365.7L585 366.1L585.9 365.5L586.8 361L585.6 357.4L589.5 355.1L589.9 352.6L591.1 348.3L594.1 338.8L594.6 333.2L594.9 333L607.2 332.8L620.8 332L620.9 328.1L624.4 328L654.8 324.7L708.8 319.5L719.1 318L726.7 317.8L729.1 315.9L730.4 316.2L730.3 319.5L729.9 321.1L727.5 323.3L725.9 326.9L723.9 326.5L721.5 327.4L719.3 330.7L717.9 330.5L717.1 329.3L716 329.7L711.7 333.7L710.9 336.8L706.7 339L702.4 342.6L698.6 344.1L694.2 346.9L693.6 350.5L691.1 351L689.1 352.7L688.9 357.5L670.8 359.6Z"
              fill={backgroundColor("Tennessee")}
            />
            <text
              x="650"
              y="350"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={600}
            >
              {` ${voteCount("Tennessee").electricalCollege}`}
            </text>

            {/* Texas white  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Texas")}
              d="M282.801 425.6L319.801 429.2L349.101 431.1L356.501 333.4L410.901 335.8L409.201 359.1L408.201 377.1L408.401 379.1L412.801 383.2L414.801 384.3H416.601L417.101 383.1L417.801 384L420.201 384.2L421.301 383.6V383.4L422.301 383.9L421.901 387.6L426.401 388.3L428.801 389.2L433.001 389.9L435.601 391.7L438.401 389.8L441.101 390.4L443.301 393.5L444.101 393.6V395.7L447.401 396.8L449.901 394.7L451.401 395.2L453.501 395.3L454.101 397.4L459.301 399.4L461.601 398.9L463.501 394.9H463.601L464.701 396.8L469.301 397.7L472.701 399L475.901 400L478.301 398.8L479.001 396.5H482.601L484.701 397.5L487.701 395.5H488.101L488.601 396.9H493.301L495.201 395.1L496.501 395.5L498.201 397.6L501.501 399.5L504.901 400.5L507.401 401.9L510.101 403.9L513.201 402.7L515.301 403.5L516.001 423.5L516.701 433L517.301 437.1L519.901 441.5L520.801 446L525.001 451.9L525.301 455L525.901 455.8L525.201 463.5L522.301 468.3L523.601 470.9L523.101 473.3L522.301 480.5L521.001 483.5L521.301 487.7L515.701 489.3L505.801 493.8L504.801 495.7L502.201 497.6L500.101 499.1L498.801 499.9L493.101 505.2L490.401 507.3L485.101 510.5L479.401 512.9L473.101 516.3L471.301 517.8L465.501 521.4L462.101 522L458.201 527.5L454.201 527.8L453.201 529.7L455.501 531.6L454.001 537.1L452.701 541.6L451.601 545.5L450.801 550L451.601 552.4L453.401 559.4L454.401 565.5L456.201 568.2L455.201 569.7L452.101 571.6L446.401 567.7L440.901 566.6L439.601 567.1L436.401 566.5L432.201 563.4L427.001 562.3L419.401 558.9L417.301 555L416.001 548.5L412.801 546.6L412.201 544.3L412.801 543.7L413.101 540.3L411.801 539.7L411.201 538.7L412.501 534.3L410.901 532L407.701 530.7L404.301 526.3L400.701 519.7L396.501 517.1L396.701 515.2L391.401 502.9L390.601 498.7L388.801 496.8L388.601 495.3L382.601 490L380.001 486.9V485.8L377.401 483.7L370.601 482.6L363.201 482L360.101 479.7L355.601 481.5L352.001 483L349.701 486.2L348.701 489.9L344.301 496L341.901 498.4L339.301 497.4L337.501 496.3L335.601 495.7L331.701 493.4V492.8L329.901 490.9L324.701 488.8L317.301 481L315.001 476.3V468.2L311.801 461.7L311.301 459L309.701 458L308.601 455.9L303.601 453.8L302.301 452.2L295.201 444.3L293.901 441.1L289.201 438.8L287.701 434.4L285.101 431.5L283.401 431L282.801 425.6ZM457.201 567.3L456.601 560.2L453.901 553L453.301 546L454.801 537.8L458.101 530.9L461.601 525.5L464.801 521.9L465.401 522.1L460.601 528.7L456.201 535.2L454.201 541.8L453.901 547L454.801 553.1L457.401 560.3L457.901 565.5L458.101 567L457.201 567.3Z"
              fill={backgroundColor("Texas")}
            />
            <text
              x="410"
              y="450"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={600}
            >
              {` ${voteCount("Texas").electricalCollege}`}
            </text>

            {/* utah dodgerblue */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Utah")}
              d="M228.401 305.9L253.001 309.5L254.901 295.8L261.901 245.3L264.201 223.3L232.001 219.8L234.201 206.7L236.001 196.1L201.301 190L188.801 187.5L178.201 240.4L172.801 270.4L169.501 285.8L167.801 295L228.401 305.9Z"
              fill={backgroundColor("Utah")}
            />
            <text
              x="215"
              y="265"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={600}
            >
              {` ${voteCount("Utah").electricalCollege}`}
            </text>

            {/* Virginia lime  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Virginia")}
              d="M834.7 265.2L834.5 268L831.6 271.8L831.2 276.4L831.7 279.8L829.9 284.8L827.7 286.7L826.2 282.1L826.6 276.7L828.2 272.5L828.9 269.2L828.8 267.5L834.7 265.2ZM774.4 309.8L735.8 315.4L731 315.3L728.8 315L726.3 316.9L719 317L708.7 318.6L702 319.2L706.1 316.6L710.2 314.3V312.2L715.9 304.9L720 301.2L722.2 298.7L725.8 303L729.6 303.9L732.3 302.9L734.3 301.4L736.7 302.6L741.3 301.3L743 296.9L745.4 297.6L748.6 295.3L750.2 295.7L753 292.5L753.2 289.8L752.4 288.6L757.2 278.1L759 272.9L759.5 268.2L760.2 268L761.3 269.7L762.8 270.9L766.7 270.7L768.4 262.6L771.4 262L772.2 259.4L775 257.2L776.1 255.1L777.9 250.8L778 246.2L781.6 247.6L788.2 250.7L788.5 245.5L791.9 246.7L791.3 249.6L799.9 252.7L801.3 254.5L800.5 257.8L799.2 259.1L798.7 260.8L799.2 263.2L801.2 264.5L805.1 265.9L808 266.9L812.9 267.8L815.1 269.9L818.3 270.3L819.2 271.5L818.8 276.2L820.2 277.3L819.7 279.2L820.9 280L820.7 281.4L818 281.3L818.1 282.9L820.4 284.4L820.5 285.8L822.3 287.6L822.8 290.1L820.2 291.5L821.8 293L827.6 291.3L831.3 297.5L774.4 309.8Z"
              fill={backgroundColor("Virginia")}
            />
            <text
              x="785"
              y="290"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={700}
            >
              {` ${voteCount("Virginia").electricalCollege}`}
            </text>

            {/* DC */}

            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("DC")}
              d="M805 260L800 257L795 260L796 255L791 250L798 249L801 243L804 249L811 250L806 255L805 260Z"
              fill={backgroundColor("DC")}
              stroke="rgba(0, 0, 0, 0.6)"
            />
            <line
              x1="800"
              y1="250"
              x2="850"
              y2="360"
              stroke="black"
              strokeWidth="2"
              className=" "
            />
            <text
              x="875"
              y="380"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight={700}
            >
             DC {` ${voteCount("DC").electricalCollege}`}
            </text>
            {/* vermont rosybrown */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Vermont")}
              d="M832.7 111.3L835.1 117.8L835.9 123.1L834.9 127L837.4 131.4L838.3 133.7L837.6 136.3L840.9 137.8L843.8 148.6V153.9L855.3 151.8L854.3 150.7L854.9 148.8L855.1 144.5L854.1 143.1L854.3 138.4L855.1 129.1V120.6L854 118.8V117.2L856.8 116.1L860.3 111.7V108.1L858.4 105.4L858.1 99.6104L832 106.4L832.7 111.3Z"
              fill={backgroundColor("Vermont")}
            />
            <line
              x1="830"
              y1="80"
              x2="840"
              y2="104"
              stroke="black"
              strokeWidth="2"
              className=" "
            />
            <text
              x="815"
              y="75"
              textAnchor="middle"
              fill="white"
              fontSize="19"
              fontWeight={700}
            >
              VT {` ${voteCount("Vermont").electricalCollege}`}
            </text>

            {/* WASHINGTON  LIME*/}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Washington")}
              d="M74.4992 67.7004L72.1992 63.4004L68.0992 62.7004L67.6992 60.3004L65.1992 59.7004L62.2992 59.2004L60.4992 60.2004L58.1992 57.3004L58.4992 54.4004L61.1992 54.1004L62.7992 50.1004L60.1992 49.0004L60.3992 45.3004L64.7992 44.7004L62.0992 42.0004L60.5992 34.9004L61.1992 32.0004V24.1004L59.3992 20.9004L61.6992 11.5004L63.7992 12.0004L66.1992 14.9004L68.8992 17.5004L72.0992 19.4004L76.5992 21.5004L79.6992 22.1004L82.5992 23.6004L85.9992 24.6004L88.2992 24.4004V22.0004L89.5992 20.9004L91.6992 19.6004L91.9992 20.7004L92.2992 22.5004L89.9992 23.0004L89.6992 25.1004L91.4992 26.6004L92.5992 29.0004L93.1992 30.9004L94.6992 30.7004L94.8992 29.4004L93.8992 28.1004L93.3992 24.9004L94.1992 23.1004L93.5992 21.6004V19.0004L95.3992 15.4004L94.2992 12.8004L91.8992 8.00039L92.1992 7.20039L93.5992 6.40039L97.9992 7.90039L107.699 10.6004L116.299 12.5004L136.299 18.2004L159.299 23.9004L174.299 27.3904L169.499 44.9504L164.999 65.7804L161.599 82.0304L161.199 91.2104L148.299 87.4904L132.999 84.0204L118.499 84.3404L117.399 82.8104L111.699 84.9004L107.799 84.4804L105.199 82.6904L103.499 83.3404L99.3492 83.0904L97.6292 81.7704L92.4692 79.9504L91.2892 79.7904L86.4892 78.4004L84.5692 80.0504L78.9192 79.8004L74.3092 76.4504L74.4992 67.7004ZM84.0992 12.3004L86.0992 12.1004L86.5992 13.5004L88.0992 11.9004H90.3992L91.1992 13.4004L89.6992 15.1004L90.2992 15.9004L89.5992 17.9004L88.1992 18.3004C88.1992 18.3004 87.2992 18.4004 87.2992 18.1004C87.2992 17.8004 88.7992 15.5004 88.7992 15.5004L87.0992 14.9004L86.7992 16.4004L86.0992 17.0004L84.5992 14.7004L84.0992 12.3004Z"
              fill={backgroundColor("Washington")}
            />
            <text
              x="110"
              y="55"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={600}
            >
              {` ${voteCount("Washington").electricalCollege}`}
            </text>

            {/* Wisconsin white  */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Wisconsin")}
              d="M541.4 109.9L544.3 110.4L547.2 109.8L554.6 106.6L557.5 104.7L559.6 103.9L561.5 105.4L560.4 106.5L558.5 109.6L557.9 111.5L558.9 112.1L560.7 111.1L561.8 110.9L564.5 111.7L565.1 112.8L566.2 113L566.8 111.9L570.8 117.2L579 118.4L587.2 120.6L589.8 121.7L602.1 124.3L603.7 126.6L607.3 127.8L609 138L610.6 139.4L612.1 140.3L611 142.6L609.2 144.2L607.1 148.9L605.8 151.3L606 153.1L607.5 153.4L608.6 151.5L610.1 150.7L610.9 148.4L612.8 146.6L615.5 142.6L619.7 136.3L620.5 135.8L620.8 136.8L620.6 139.1L617.7 145.9L615 151.6L614.5 154.8L613.9 157.4L614.7 158.7L614.5 161.4L612.6 163.8L612.1 165.6L612.7 169.2L613.3 172.6L611.8 175.2L611 178.1L610 181.2L611.1 183.6L611.7 189.7L613.3 194.2L613.1 197.2L597.2 199L579.7 200H567L566.3 198.5L563.4 198.1L560.8 196.8L558.5 193.1L558.2 189.5L560.2 186.6L559.7 185.2L557.6 183L556.8 179.7L556.2 172.9L554.1 170.4L547.1 165.9L543.3 160.5L539.9 159.5L537.7 156.7H534.5L531.6 153.4L531.1 146.9L531.2 143.1L532.7 140L531.9 136.8L529.4 134L531.2 128.6L536.4 124.8L538 122.9L537.8 114.8L538 112L540.4 109.2L541.4 109.9Z"
              fill={backgroundColor("Wisconsin")}
            />
            <text
              x="575"
              y="163"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={600}
            >
              {` ${voteCount("Wisconsin").electricalCollege}`}
            </text>

            {/* WestVirginia darkcyan */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("West Virginia")}
              d="M758.9 254.3L764.7 248.3L767.3 247.5L768.9 246L770.4 243.8L771.5 244.1L774.6 243.9L779.2 240.3L780.7 239.8L782 240.8L784.6 242L787.6 245L787.2 249.3L781.8 246.7L777 244.9L776.9 250.8L774.3 256.5L771.4 258.9L770.6 261.2L767.6 261.7L765.9 269.8L763.1 270L762 269L760.8 267L758.6 267.5L758.1 272.6L756.3 277.7L751.3 288.7L752.2 290.1L752.1 292.1L749.9 294.6L748.3 294.2L745.2 296.5L742.4 295.7L740.6 300.6L736.8 301.6L734.3 300.3L731.8 302.2L729.5 302.9L726.3 302.1L722.5 297.6L719 295.4L716.5 292.9L713.6 289.2L713.1 286.9L710.3 285.2L709.7 283.9L709.5 278.3L709.8 278.4L712.2 278.2L714 277.2V275L715.7 273.5L715.8 268.3L716.7 264.7L717.8 264L718.2 264.3L719.2 265.4L720.9 265.9L722 264.6L721 261.5V259.9L724.1 255.3L725.3 254L727.3 254.5L729.9 252.7L733 249.3L735.4 245.2L735.6 239.6L736.1 234.8V229.9L735 226.9L735.9 225.6L736.7 224.9L741 244.2L745.3 243.4L756.5 242.1L758.9 254.3Z"
              fill={backgroundColor("West Virginia")}
            />
            <text
              x="740"
              y="275"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={600}
            >
              {` ${voteCount("West Virginia").electricalCollege}`}
            </text>

            {/* Wyoming navajowhite */}
            <path
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleToolTip("Wyoming")}
              d="M352.999 161.9L351.499 187.3L347.099 231.3L344.399 231L261.099 221.9L233.199 218.9L235.199 206.9L242.099 165.9L245.899 141.7L247.199 130.5L295.399 137.5L354.499 144L352.999 161.9Z"
              fill={backgroundColor("Wyoming")}
            />
            <text
              x="290"
              y="185"
              textAnchor="middle"
              fill="black"
              fontSize="19"
              fontWeight={600}
            >
              {` ${voteCount("Wyoming").electricalCollege}`}
            </text>

            {/* <path d="M752 345C759.732 345 766 338.732 766 331C766 323.268 759.732 317 752 317C744.268 317 738 323.268 738 331C738 338.732 744.268 345 752 345Z" fill="#698DC5" /> */}
            <path
              d="M215 493V548L251 593M215 493L147 425H0M215 493H300L354 547V593"
              stroke="#A9A9A9"
              strokeWidth="2"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_2">
            <rect width="1020" height="593" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default Map;
