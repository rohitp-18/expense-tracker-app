import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import React from "react";
import { Transaction } from "@/components/redux/slices/transSlice";
import Slide from "@/components/Slide";
import Filters from "@/components/Filters";
import moment from "moment";
import Transac from "@/components/transac";

export default function Bookmark() {
  interface filterInter {
    type: string;
    count: string;
    category: string;
    date: string;
    sort: string;
  }

  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState<Transaction[]>([]);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<filterInter>({
    type: "all",
    count: "all",
    category: "all",
    date: "all",
    sort: "asending",
  });

  const { transactions } = useSelector((state: any) => state.transaction);

  // to track the change in search keyword and change in transactions
  useEffect(() => {
    applyFilter();
  }, [transactions, search]);

  const filterByDate = (type: any, days: number, endWith: any) =>
    transactions.filter((t: any) => {
      const oneWeekAgo = moment().subtract(days, type).startOf(endWith);
      const today = moment().subtract(days, type).endOf(endWith);

      return moment(new Date(Date.parse(t.date))).isBetween(oneWeekAgo, today);
    });

  // apply filter on transactions
  function applyFilter() {
    setOpen(false);
    let tempData;
    switch (filters.date) {
      case "week":
        tempData = filterByDate("days", 7, "week");
        break;

      case "month":
        tempData = filterByDate("month", 1, "month");
        break;

      case "thisMonth":
        tempData = filterByDate("days", 0, "month");
        break;

      case "thisWeek":
        tempData = filterByDate("days", 0, "week");
        break;

      case "thisYear":
        tempData = filterByDate("days", 0, "year");
        break;

      case "year":
        tempData = filterByDate("year", 1, "year");
        break;

      default:
        tempData = transactions;
    }

    if (!tempData) {
      setSearchData([]);
      return;
    }

    if (filters.type !== "all") {
      tempData = tempData.filter(
        (transaction: Transaction) => transaction.type === filters.type
      );
    }

    if (!tempData) {
      setSearchData([]);
      return;
    }

    if (filters.category !== "all") {
      tempData = tempData.filter(
        (transaction: Transaction) => transaction.category === filters.category
      );
    }

    if (!tempData) {
      setSearchData([]);
      return;
    }

    if (search.length !== 0) {
      tempData = tempData.filter((item: Transaction) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (!tempData) {
      setSearchData([]);
      return;
    }

    if (filters.count !== "all") {
      tempData = tempData.slice(
        0,
        tempData.length > filters.count ? filters.count : tempData.length
      );
    }

    tempData = [...tempData];

    switch (filters.sort) {
      case "asending":
        tempData = tempData.sort(
          (item: Transaction, item2: Transaction) =>
            new Date(item2.date).valueOf() - new Date(item.date).valueOf()
        );
        break;

      case "desending":
        tempData = tempData.sort(
          (item: Transaction, item2: Transaction) =>
            new Date(item.date).valueOf() - new Date(item2.date).valueOf()
        );
        break;

      case "big":
        tempData = tempData.sort(
          (item: Transaction, item2: Transaction) => item2.amount - item.amount
        );
        break;

      case "small":
        tempData = tempData.sort(
          (item: Transaction, item2: Transaction) => item.amount - item2.amount
        );
        break;

      default:
        tempData = tempData;
    }

    setSearchData(tempData);
  }

  return (
    <>
      <ScrollView>
        <View className="min-h-screen pt-2 pb-8 bg-primary">
          {/* Search element */}
          <View className={`space-y-2 mt-3 py-4 px-3 bg-black-200 w-full`}>
            <View className="w-full h-12 px-2 bg-black-100 rounded-2xl border-2 relative border-black-200 focus:border-secondary flex flex-row items-center">
              <Icon name="search1" size={16} color="white" />
              <TextInput
                className="flex-auto flex pl-3 text-white font-semibold text-base"
                value={search}
                placeholder="Search..."
                style={{ color: "white" }}
                onChangeText={(e: any) => setSearch(e)}
              />
            </View>
          </View>

          {/* add new transaction button and filters */}
          <View className="flex flex-row w-full pt-7 px-3 justify-between items-center">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/new")}
              className="border border-[#aaa] opacity-90 flex flex-row rounded-lg items-center justify-between p-1 px-2 pl-1 gap-1"
            >
              <Icon name="plus" size={13} color="white" />
              <Text className="text-white text-sm">New Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              className="border border-[#aaa] opacity-90 flex flex-row rounded-lg items-center justify-between p-1 px-4 gap-1"
            >
              <Icon name="filter" size={13} color="white" />
              <Text className="text-white text-sm">Filters</Text>
            </TouchableOpacity>
          </View>

          {/* all transactions */}
          <View className="flex flex-row w-full pt-5 justify-center">
            <View className="flex flex-col justify-start gap-3 p-3 items-center w-full">
              {searchData.length > 0 ? (
                searchData.map((item: Transaction) => (
                  <Transac key={item.id} item={item} />
                ))
              ) : (
                <View className="flex-1 flex-row justify-center min-h-52 items-center flex w-full">
                  <Text className="text-gray-300 font-semibold text-center text-xl">
                    There is no more transactions
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* filters and sort by */}
        {open && (
          <Slide
            popupStyle={{ width: 320, overflow: "hidden" }}
            open={open}
            onClose={() => setOpen(false)}
          >
            <Filters
              onClick={applyFilter}
              onClose={() => setOpen(false)}
              filters={filters}
              setFilters={setFilters}
            />
          </Slide>
        )}
      </ScrollView>
    </>
  );
}
