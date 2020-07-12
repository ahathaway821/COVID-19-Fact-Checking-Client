import React from "react";
import { Card, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import { submitFeedback, feedbackTypes } from "../shared/submitFeedback";

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showYes: false,
            showNo: false,
            isLabelCorrect: false,
            isLoaded: false,
            error: null,
            showModal: false
        };
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitFeedback = this.handleSubmitFeedback.bind(this);
    }

    handleShowModal(isLabelCorrect) {
        this.setState({ showModal: true, isLabelCorrect: isLabelCorrect });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    getLabel() {
        return this.state.isLabelCorrect ? 'Correct' : 'Incorrect';
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }


    handleSubmitFeedback() {
        this.setState({isLoaded: false, error: null});
        submitFeedback(
            this.props.claim, 
            this.props.isValidatedClaim, 
            feedbackTypes.userFeedback, 
            this.state.reasoning ?? '', 
            this.state.isLabelCorrect)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                    });
                    this.handleCloseModal();
                }
            )
            .catch(error => {
                console.log(error.response);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    render() {
        return (
            <>
            <Card>
                <Card.Header>Feedback</Card.Header>
                <Card.Body>
                        {'Do you agree with our prediction?'}
                        {' '}
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary" onClick={() => this.handleShowModal(true)}>Yes</Button>
                            <Button variant="secondary" onClick={() => this.handleShowModal(false)}>No</Button>
                        </ButtonGroup>
                </Card.Body>
            </Card>
            <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Thanks for the feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please answer a couple of questions below to tell us more about what you thought of Covid Fact
                    <hr />
                    <Form>
                        {/* <Form.Group controlId="formBasicRange">
                            <Form.Label><b>From a scale of 1 - 10, how easy was it to navigate the website</b></Form.Label>
                            <RangeSlider
                                value={2}
                                min={1}
                                max={5}
                                tooltip={'on'}
                                // onChange={changeEvent => this.setState({value: (Number(changeEvent.target.value))}
                            />
                            <br />
                        </Form.Group> */}
                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>What did we do well?</b></Form.Label>
                            <Form.Check 
                                type={'checkbox'}
                                id={`default-checkbox`}
                                label={`Easy to use`}
                            />
                            <Form.Check 
                                type={'checkbox'}
                                id={`default-checkbox`}
                                label={`Research Papers were helpful`}
                            />
                            <Form.Check 
                                type={'checkbox'}
                                id={`default-checkbox`}
                                label={`Helped validate my opinion`}
                            />
                        </Form.Group> */}
                        <Form.Group controlId="formFeedback">
                            <Form.Label><b>Claim Label</b></Form.Label>
                            <Form.Text>
                                {this.getLabel()}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formFeedback">
                            <Form.Label><b>Reasoning</b></Form.Label>
                            <Form.Control as="textarea" rows="3" value={this.state.reasoning} onChange={this.handleChange}/>
                            <Form.Text className="text-muted">
                                <i>This feedback is anonymous</i>
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmitFeedback}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        )

    }    
}

export default withRouter(Feedback);
