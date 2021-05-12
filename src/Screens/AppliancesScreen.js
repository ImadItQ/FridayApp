import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import LogoutButton from "../Components/logoutButton";
import AddButton from "../Components/addButton";
import ApplianceList from "../Components/applianceList";
import DeleteAppliance from "../Components/deleteAppliance";
import { API, graphqlOperation } from "aws-amplify";
import { listAppliances } from "../graphql/queries";
import {
  createAppliance,
  updateAppliance,
  deleteAppliance,
} from "../graphql/mutations";

export default function ApplianceScreen() {
  // State Hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [applianceId, setApplianceId] = useState(0);
  const [appliance, setAppliance] = useState([]);

  useEffect(() => {
    fetchAppliance();
  }, []);

  //   Fetch the list of Appliances
  const fetchAppliance = async () => {
    try {
      const ApplianceData = await API.graphql(graphqlOperation(listAppliances));
      const ApplianceList = ApplianceData.data.listAppliances.items;
      console.log("list appliances", ApplianceList);
      setAppliance(ApplianceList);
    } catch (error) {
      console.log("error:", error);
    }
  };

  // Create an Appliance
  const save = async () => {
    const status = "off";
    const data = {
      appliance_name: text,
      appliance_status: status,
    };
    try {
      const result = await API.graphql(
        graphqlOperation(createAppliance, { input: data })
      );
      const newAppliance = result.data.createAppliance;
      const updatedAppliance = [...appliance, newAppliance];
      setAppliance(updatedAppliance);
      setModalOpen(false);
      console.log("success");
    } catch (e) {
      console.log("error:", e);
    }
  };

  // Handle the text change
  const changeHandler = (val) => {
    setText(val);
  };

  // Delete the appliance from the list
  const deleteAnAppliance = async (id) => {
    try {
      const item = { id: id };
      const ApplianceData = await API.graphql(
        graphqlOperation(deleteAppliance, { input: item })
      );
      const deletedApplianceId = ApplianceData.data.deleteAppliance.id;

      const updatedAppliance = appliance.filter(
        (appliance) => appliance.id !== deletedApplianceId
      );
      setAppliance(updatedAppliance);
      setDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle the state of the appliance
  const toggleAppliance = async (id) => {
    try {
      const component = appliance.filter((item) => item.id === id);
      let item = component[0];
      if (item.appliance_status == "off") {
        item.appliance_status = "on";
      } else if (item.appliance_status == "on") {
        item.appliance_status = "off";
      }
      delete item.createdAt;
      delete item.updatedAt;
      delete item._deleted;
      delete item._lastChangedAt;
      delete item.owner;
      console.log(item);
      const ApplianceData = await API.graphql(
        graphqlOperation(updateAppliance, { input: item })
      );
      const ApplianceList = [...appliance];
      let getId = ApplianceList.filter((item) => item.id === id);
      let idx = getId[0];
      idx = ApplianceData.data.updateAppliance;
      setAppliance(ApplianceList);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <LogoutButton />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Appliances</Text>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalOpen}
        animationType="slide"
      >
        <TouchableOpacity
          style={styles.form}
          onPress={() => setModalOpen(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Enter appliance name"
                onChangeText={changeHandler}
              />
              <TouchableOpacity onPress={save}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={deleteModal}
        animationType="slide"
      >
        <TouchableOpacity
          style={styles.form}
          onPress={() => setDeleteModal(false)}
        >
          <TouchableWithoutFeedback>
            <DeleteAppliance
              deleteAnAppliance={() => deleteAnAppliance(applianceId)}
              closeModal={() => setDeleteModal(false)}
            />
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <View style={styles.content}>
        <View style={styles.list}>
          <FlatList
            data={appliance}
            extraData={appliance}
            renderItem={({ item }) => (
              <ApplianceList
                item={item}
                toggleAppliance={() => toggleAppliance(item.id)}
                deleteAppliance={() => {
                  setDeleteModal(true);
                  setApplianceId(item.id);
                }}
              />
            )}
          />
        </View>
      </View>
      <AddButton showModal={() => setModalOpen(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#26004d",
  },
  headerContainer: {
    top: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    color: "white",
    fontWeight: "700",
  },
  content: {
    padding: 40,
  },

  list: {
    marginTop: 40,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: "70%",
    height: "40%",
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  buttonContainer: {
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#FF8DFF",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
});
