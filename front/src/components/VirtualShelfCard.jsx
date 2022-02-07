import {
  Form,
  Button,
  Input,
  Card,
  Grid,
  CardGroup,
  Modal,
} from "semantic-ui-react";

import { useEffect, useState } from "react";

const VirtualShelfCard = ({
  item,
  handleDelete,
  handleEdit,
  description2,
  setDescription2,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <Card.Content>
        <Card.Header>{item.idVirtualShelf}</Card.Header>
        <Card.Meta>{item.createdAt}</Card.Meta>
        <Card.Description>{item.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
          >
            <Modal.Header>Enter a description</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <label>Description</label>
                <Input
                  value={description2}
                  onChange={(event) => setDescription2(event.target.value)}
                />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={() => setOpen(false)}>
                Back
              </Button>
              <Button
                content="Finish edit"
                labelPosition="right"
                icon="checkmark"
                onClick={(event) => {
                  handleEdit(event, item.idVirtualShelf);
                }}
                positive
              />
            </Modal.Actions>
          </Modal>
          <Button basic color="green" onClick={() => setOpen(true)}>
            Edit
          </Button>
          <Button
            basic
            color="red"
            onClick={(event) => handleDelete(event, item.idVirtualShelf)}
          >
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default VirtualShelfCard;
