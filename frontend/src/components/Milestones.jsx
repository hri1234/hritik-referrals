import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // Layout
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"; // Progress bar
import "react-circular-progressbar/dist/styles.css"; // Styles for progress bar
import { MdCheck } from "react-icons/md"; // Checkmark
import { ACHIEVED_COLOR, OPEN_COLOR, aspectRatio, colStyle, topRightCorner } from "./mstyle";
import Referral from "./Referral";
import { useDispatch , useSelector } from "react-redux";


const milestoneList = [
    {
        imageLocation: "assets/1_kitten.jpg",
        lowerThreshold: 0,
        upperThreshold: 5
    },
    {
        imageLocation: "assets/2_kitten.jpg",
        lowerThreshold: 5,
        upperThreshold: 10
    },
    {
        imageLocation: "assets/3_kitten.jpg",
        lowerThreshold: 10,
        upperThreshold: 20
    }
];

const ProgressBarText = (upperThreshold, referrals, percent) => {
    const color = percent <= 0 ? OPEN_COLOR : ACHIEVED_COLOR;

    if (percent < 0) {
        return <span style={{ color, fontSize: "12px" }}>{upperThreshold}</span>;
    } else if (percent >= 100) {
        return (
            <span style={{ color, fontSize: "12px" }}>
                {upperThreshold} <MdCheck style={{ color }} />
            </span>
        );
    } else {
        return (
            <span style={{ color, fontSize: "12px" }}>
                {referrals}/{upperThreshold}
            </span>
        );
    }
};


const Milestone = (url, lowerThreshold, upperThreshold, referrals) => {
    const required_referrals = upperThreshold - lowerThreshold;
    const achieved_referrals = referrals - lowerThreshold;
    const percentage = (achieved_referrals / required_referrals) * 100;
    const text = ProgressBarText(upperThreshold, referrals, percentage);
    
    return (
        <div style={{ paddingTop: "25px" }}>
            <div style={aspectRatio}>
                <div className="z-depth-4" style={{ ...colStyle, backgroundImage: `url("${'http://localhost:500'}")` }}>
                    <div style={topRightCorner}>
                        <CircularProgressbarWithChildren
                            value={percentage}
                            strokeWidth={10}
                            styles={buildStyles({
                                textColor: ACHIEVED_COLOR,
                                pathColor: ACHIEVED_COLOR,
                                textSize: "32px"
                            })}
                        >
                            {text}
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Milestones = props => {
    const { user } = useSelector((state) => state.auth)
    const referrals = props.referrals || 0;
    // const name = {user.name};
    return (
        <>
        <Container>
            <div style={{ padding: "25px" }}>
                <Row>
                    {milestoneList.map(function(item) {
                        return (
                            <Col xs={12} sm={6} md={4}>
                                {Milestone(item.imageLocation, item.lowerThreshold, item.upperThreshold, referrals)}
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </Container>

        <div className="App">
      <Referral name={user && user.name} />
    </div>
        </>
    );
};

export default Milestones;


