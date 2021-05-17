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
import LogoutButton from "../components/logoutButton";
import AddButton from "../components/addButton";
import ApplianceList from "../components/applianceList";
import DeleteAppliance from "../components/deleteAppliance";
import { API, graphqlOperation } from "aws-amplify";
import { listAppliances } from "../graphql/queries";
import { Picker } from "@react-native-picker/picker";
import {
  createAppliance,
  updateAppliance,
  deleteAppliance,
} from "../graphql/mutations";
import {
  newOnCreateAppliance,
  newOnUpdateAppliance,
  newOnDeleteAppliance,
} from "../graphql/subscriptions";

export default function ApplianceScreen() {
  // State Hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [RoomSelected, setRoomSelected] = useState("Hall");
  const [ApplianceType, setApplianceType] = useState("Heavy");
  const [deleteModal, setDeleteModal] = useState(false);
  const [applianceId, setApplianceId] = useState(0);
  const [appliance, setAppliance] = useState([]);
  const [device, setDevice] = useState();
  const [heavyCount, setHeavyCount] = useState(0);
  const [moderateCount, setModerateCount] = useState(0);
  const [lowCount, setLowCount] = useState(0);

  //   Fetch the list of Appliances
  const fetchAppliance = async () => {
    try {
      const ApplianceData = await API.graphql(graphqlOperation(listAppliances));
      const ApplianceList = ApplianceData.data.listAppliances.items;
      // console.log("list appliances", ApplianceList);
      setAppliance(ApplianceList);
      for (let i = 0; i < ApplianceList.length; i++) {
        ApplianceList[i].low_count > 0 &&
          setLowCount(ApplianceList[i].low_count);
        ApplianceList[i].moderate_count > 0 &&
          setModerateCount(ApplianceList[i].moderate_count);
        ApplianceList[i].heavy_count > 0 &&
          setHeavyCount(ApplianceList[i].heavy_count);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    fetchAppliance();
  }, []);

  let subscriptionOnCreate;
  let subscriptionOnUpdate;
  let subscriptionOnDelete;

  // set subscriptions on create,delete and update
  const setSubscription = () => {
    subscriptionOnCreate = API.graphql(
      graphqlOperation(newOnCreateAppliance)
    ).subscribe({
      next: (deviceData) => {
        setDevice(deviceData.value.data.newOnCreateAppliance);
      },
    });

    subscriptionOnUpdate = API.graphql(
      graphqlOperation(newOnUpdateAppliance)
    ).subscribe({
      next: (deviceData) => {
        setDevice(deviceData.value.data.newOnUpdateAppliance);
      },
    });

    subscriptionOnDelete = API.graphql(
      graphqlOperation(newOnDeleteAppliance)
    ).subscribe({
      next: (deviceData) => {
        setDevice(deviceData.value.data.newOnDeleteAppliance);
      },
    });
  };

  useEffect(() => {
    setSubscription();
    return () => {
      subscriptionOnCreate.unsubscribe();
      subscriptionOnUpdate.unsubscribe();
      subscriptionOnDelete.unsubscribe();
    };
  }, []);

  // Create an Appliance
  const save = async () => {
    const status = "off";
    const data = {
      appliance_name: text,
      appliance_status: status,
      appliance_type: ApplianceType,
      appliance_room: RoomSelected,
      heavy_count: heavyCount,
      moderate_count: moderateCount,
      low_count: lowCount,
    };
    try {
      const result = await API.graphql(
        graphqlOperation(createAppliance, { input: data })
      );
      const newAppliance = result.data.createAppliance;
      const updatedAppliance = [...appliance, newAppliance];
      setAppliance(updatedAppliance);
      setModalOpen(false);
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
        if (item.appliance_type == "Heavy") {
          item.heavy_count = heavyCount + 1;
          setHeavyCount(item.heavy_count);
        }
        if (item.appliance_type == "Moderate") {
          item.moderate_count = moderateCount + 1;
          setModerateCount(item.moderate_count);
        }
        if (item.appliance_type == "Low") {
          item.low_count = lowCount + 1;
          setLowCount(item.low_count);
        }
      } else if (item.appliance_status == "on") {
        item.appliance_status = "off";
        if (item.appliance_type == "Heavy" && heavyCount >= 0) {
          item.heavy_count = heavyCount - 1;
          setHeavyCount(item.heavy_count);
        }
        if (item.appliance_type == "Moderate" && moderateCount >= 0) {
          item.moderate_count = moderateCount - 1;
          setModerateCount(item.moderate_count);
        }
        if (item.appliance_type == "Low" && lowCount >= 0) {
          item.low_count = lowCount - 1;
          setLowCount(item.low_count);
        }
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
      <View style={styles.headerSide}>
        <View style={styles.lowBubble}>
          <Text style={styles.bubbleText}>{lowCount}</Text>
        </View>
        <View style={styles.moderateBubble}>
          <Text style={styles.bubbleText}>{moderateCount}</Text>
        </View>
        <View style={styles.heavyBubble}>
          <Text style={styles.bubbleText}>{heavyCount}</Text>
        </View>
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

              <Picker
                selectedValue={RoomSelected}
                onValueChange={(ItemValue, ItemIndex) =>
                  setRoomSelected(ItemValue)
                }
              >
                <Picker.Item label="Hall" value="Hall" />
                <Picker.Item label="Bedroom" value="Bedroom" />
                <Picker.Item label="Kitchen" value="Kitchen" />
              </Picker>

              <Picker
                selectedValue={ApplianceType}
                onValueChange={(ItemValue, ItemIndex) =>
                  setApplianceType(ItemValue)
                }
              >
                <Picker.Item label="Heavy" value="Heavy" />
                <Picker.Item label="Moderate" value="Moderate" />
                <Picker.Item label="Low" value="Low" />
              </Picker>
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
  header: {
    fontSize: 20,
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
    height: "60%",
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
  headerSide: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    zIndex: 10,
    right: 10,
    top: 30,
  },
  bubbleText: {
    color: "white",
    fontWeight: "700",
  },
  heavyBubble: {
    width: 30,
    height: 30,
    backgroundColor: "#ff6666",
    marginRight: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  moderateBubble: {
    width: 30,
    height: 30,
    backgroundColor: "#66ccff",
    marginRight: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  lowBubble: {
    width: 30,
    height: 30,
    backgroundColor: "#85e085",
    marginRight: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
