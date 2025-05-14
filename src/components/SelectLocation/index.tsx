import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { stylesSelectLocation } from './styles';
import Modal from 'react-native-modal';
import { Colors } from '../../assets/Colors';

import CommonText from '../CommonText';

interface ProvinceDto {
  province_id: string;
  province_name: string;
  province_type: string;
}

interface DistrictDto {
  district_id: string;
  district_name: string;
}

interface WardDto {
  ward_id: string;
  ward_name: string;
}

interface PropsDto {
  province?: ProvinceDto;
  setProvince: Dispatch<SetStateAction<ProvinceDto | undefined>>;
  district?: DistrictDto;
  setDistrict: Dispatch<SetStateAction<DistrictDto | undefined>>;
  ward?: WardDto;
  setWard: Dispatch<SetStateAction<WardDto | undefined>>;
  showLabel?: boolean;
}

export function SelectLocation({ setDistrict, setProvince, setWard, district, province, ward, showLabel }: PropsDto): JSX.Element {
  const [dataProvider, setDataProvider] = useState<ProvinceDto[]>([]);
  const [dataDistrict, setDataDistrict] = useState<DistrictDto[]>([]);
  const [dataWard, setDataWard] = useState<WardDto[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalDistrictVisible, setIsModalDistrictVisible] = useState(false);
  const [isModalWardVisible, setIsModalWardVisible] = useState(false);

  const toggleModal = () => {
    dataProvider.length && setIsModalVisible(!isModalVisible);
  };
  const toggleModalDistrict = () => {
    dataDistrict.length && setIsModalDistrictVisible(!isModalDistrictVisible);
  };
  const toggleModalWard = () => {
    dataWard.length && setIsModalWardVisible(!isModalWardVisible);
  };

  const selectProvince = (province: ProvinceDto) => {
    setProvince(province);
    setDistrict(undefined);
    setWard(undefined);
    toggleModal();
  };

  const selectDistrict = (district: DistrictDto) => {
    setDistrict(district);
    setWard(undefined);
    toggleModalDistrict();
  };

  const selectWard = (ward: WardDto) => {
    setWard(ward);
    toggleModalWard();
  };

  useEffect(() => {
    async function fetchDataProvider() {
      // if (!dataProvider.length) {
      //   try {
      //     setLoading(true);
      //     const res = await triggerGetProvince();
      //     setLoading(false);
      //     if (res.data) {
      //       const dataSort = (res.data || []).sort((a: ProvinceDto, b: ProvinceDto) => +a.province_id - +b.province_id);
      //       setDataProvider(dataSort);
      //     }
      //   } catch (error) {
      //     setLoading(false);
      //     console.error('Error fetching provinces:', error);
      //   }
      // }
    }

    fetchDataProvider();
  }, []);

  useEffect(() => {
    async function fetchDataProvider() {
      if (province?.province_id) {
        // try {
        //   setLoading(true);
        //   triggerGetDistrict({ id: province.province_id })
        //     .then(res => {
        //       if (res.data) {
        //         const dataSort = (res.data || []).sort((a: DistrictDto, b: DistrictDto) => +a.district_id - +b.district_id);
        //         setDataDistrict(dataSort);
        //       }
        //       setLoading(false);
        //     })
        //     .catch(e => {
        //       setLoading(false);
        //     });
        // } catch (error) {
        //   setLoading(false);
        //   console.error('Error fetching districts:', error);
        // }
      }
    }

    fetchDataProvider();
  }, [province]);

  useEffect(() => {
    async function fetchDataProvider() {
      // if (district?.district_id) {
      //   try {
      //     setLoading(true);
      //     triggerGetWard({ id: district.district_id })
      //       .then(res => {
      //         if (res.data) {
      //           const dataSort = (res.data || []).sort((a: WardDto, b: WardDto) => +a.ward_id - +b.ward_id);
      //           setDataWard(dataSort);
      //         }
      //         setLoading(false);
      //       })
      //       .catch(e => {
      //         setLoading(false);
      //       });
      //   } catch (error) {
      //     setLoading(false);
      //     console.error('Error fetching wards:', error);
      //   }
      // }
    }

    fetchDataProvider();
  }, [district]);

  return (
    <View style={stylesSelectLocation.container}>
      {/* Chọn tỉnh */}
      {showLabel ? <CommonText text="Tỉnh" styles={{ marginBottom: 8 }} /> : <></>}
      <TouchableOpacity style={stylesSelectLocation.dropdown} onPress={toggleModal}>
        <Text
          style={{
            ...stylesSelectLocation.dropdownText,
            color: province?.province_name ? 'black' : Colors.textSecondary,
          }}>
          {province?.province_name ? province.province_name : 'Chọn tỉnh *'}
        </Text>
      </TouchableOpacity>

      {/* Modal hiển thị danh sách tỉnh */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // Đóng khi ấn ra ngoài
        style={stylesSelectLocation.modalContainer}>
        <View style={stylesSelectLocation.modalContent}>
          <Text style={stylesSelectLocation.modalTitle}>Chọn tỉnh</Text>
          <FlatList
            data={dataProvider}
            keyExtractor={item => item.province_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={stylesSelectLocation.dropdownItem} onPress={() => selectProvince(item)}>
                <Text style={stylesSelectLocation.dropdownItemText}>{item.province_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Chọn huyện */}
      {showLabel ? <CommonText text="Quận(huyện)" styles={{ marginBottom: 8 }} /> : <></>}
      <TouchableOpacity style={stylesSelectLocation.dropdown} onPress={toggleModalDistrict}>
        <Text
          style={{
            ...stylesSelectLocation.dropdownText,
            color: district?.district_name ? 'black' : Colors.textSecondary,
          }}>
          {district?.district_name ? district.district_name : 'Chọn quận(huyện) *'}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalDistrictVisible}
        onBackdropPress={toggleModalDistrict} // Đóng khi ấn ra ngoài
        style={stylesSelectLocation.modalContainer}>
        <View style={stylesSelectLocation.modalContent}>
          <Text style={stylesSelectLocation.modalTitle}>Chọn quận(huyện)</Text>
          <FlatList
            data={dataDistrict}
            keyExtractor={item => item.district_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={stylesSelectLocation.dropdownItem} onPress={() => selectDistrict(item)}>
                <Text style={stylesSelectLocation.dropdownItemText}>{item.district_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Chọn phường xã */}
      {showLabel ? <CommonText text="Phường(xã)" styles={{ marginBottom: 8 }} /> : <></>}
      <TouchableOpacity style={stylesSelectLocation.dropdown} onPress={toggleModalWard}>
        <Text
          style={{
            ...stylesSelectLocation.dropdownText,
            color: ward?.ward_name ? 'black' : Colors.textSecondary,
          }}>
          {ward?.ward_name ? ward.ward_name : 'Chọn phường(xã) *'}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalWardVisible}
        onBackdropPress={toggleModalWard} // Đóng khi ấn ra ngoài
        style={stylesSelectLocation.modalContainer}>
        <View style={stylesSelectLocation.modalContent}>
          <Text style={stylesSelectLocation.modalTitle}>Chọn phường(xã)</Text>
          <FlatList
            data={dataWard}
            keyExtractor={item => item.ward_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={stylesSelectLocation.dropdownItem} onPress={() => selectWard(item)}>
                <Text style={stylesSelectLocation.dropdownItemText}>{item.ward_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}
