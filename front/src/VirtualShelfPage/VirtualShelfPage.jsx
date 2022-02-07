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
import { api } from "../utils/api";
import VirtualShelfCard from "../components/VirtualShelfCard";

const VirtualShelfPage = function () {
  const [open, setOpen] = useState(false);
  const [idFiltru, setIdFiltru] = useState("");
  const [filter, setFilter] = useState("");
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [virtualShelfList, setVirtualShelfList] = useState([]);

  useEffect(() => {
    api
      .get("/virtualShelf")
      .then((response) => {
        if (response.status === 200) {
          setVirtualShelfList(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    api
      .post(`/virtualShelf`, {
        description: description,
      })
      .then((response) => {
        if (response.status === 200) {
          history.go(0);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleEdit = (event, id) => {
    event.preventDefault();
    console.log(id);
    api
      .put(`/virtualShelf/${id}`, {
        description: description2,
      })
      .then((response) => {
        if (response.status === 202) {
          history.go(0);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
    setOpen(false);
  };

  const handleDelete = (event, id) => {
    event.preventDefault();
    api
      .delete(`/virtualShelf/${id}`)
      .then((response) => {
        if (response.status === 200) {
          history.go(0);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleFilter = (event) => {
    event.preventDefault();
    if (idFiltru === "" && filter === "") {
      api
        .get(`/virtualShelf`)
        .then((response) => {
          if (response.status === 200) {
            setVirtualShelfList(response.data);
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      api
        .get(
          `/virtualShelf/filter?idVirtualShelf=${idFiltru}&description=${filter}`
        )
        .then((response) => {
          if (response.status === 200) {
            setVirtualShelfList(response.data);
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  const renderCards = () => {
    let cardItems = virtualShelfList.map((e) => {
      return (
        <Card.Group key={e.idVirtualShelf}>
          <VirtualShelfCard
            item={e}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            description2={description2}
            setDescription2={setDescription2}
          />
        </Card.Group>
      );
    });

    return cardItems;
  };

  return (
    <div>
      <div>
        <h1>Create Virtual Shelf</h1>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Field>

          <Button primary>Create</Button>
        </Form>
      </div>

      <div>
        <h1>Filter Virtual Shelf</h1>
        <label>Id</label>
        <Input
          value={idFiltru}
          onChange={(event) => setIdFiltru(event.target.value)}
        />
        <label>Descriere</label>
        <Input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        <Button onClick={handleFilter} primary>
          Search
        </Button>
      </div>

      <div>
        <h1>List of Virtual Shelves</h1>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{renderCards()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default VirtualShelfPage;
