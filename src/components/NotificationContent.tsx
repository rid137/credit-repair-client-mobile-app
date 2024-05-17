import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
// import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { notificationData } from "@/utils/dummy";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/constants';

const NotificationContent = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleOpenClick = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };    
  
  return (
    <div className="cente py-4 px-4 ">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notificationData.map((item, index) => (
            <div
              key={index}
              className={`border border-gray-300 p- md:p- w-full transition-all rounded-md ${openIndex === index ? "bg-white ": " "}`}
            >
              <div className={`flex justify-between items-center gap-3 rounded-md cursor-pointer transition-all p-4  ${openIndex === index ? "bg-transparent" : "bg-[#939393] shadow-md hover:bg-primary"}`} onClick={() => handleOpenClick(index)}>
                <div
                  className={`w-full font-bold text-[.9rem] tracking-wide ${openIndex === index ? "text-primary" : "text-white"}`}
                >
                  {item.title}
                </div>
                <div className={`${openIndex === index ? "bg-primary text-white" : "bg-white"} flex__center w-10 h-8 rounded-md`}>
                  {openIndex === index ? 
                    <p>
                        <FontAwesome
                            name="info-circle"
                            size={25}
                            color={COLORS?.grayBg}
                            style={{ marginRight: 15 }}
                        />
                    </p> : 
                    <p>
                      <FontAwesome
                            name="info-circle"
                            size={25}
                            color={COLORS?.grayBg}
                            style={{ marginRight: 15}}
                        />
                    </p>
                }
                </div>
              </div>
              {openIndex === index && (
                <div className="text-grey mt-3 text-[.9rem] tracking-wide text-justify p-4">
                  {item.body}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationContent

const styles = StyleSheet.create({})