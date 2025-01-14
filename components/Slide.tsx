import { Modal, ModalBaseProps, Pressable, ViewStyle } from "react-native";
import React from "react";

interface SlideProps extends ModalBaseProps {
  open?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  popupStyle?: ViewStyle;
}

const Slide = ({ open, onClose, children, popupStyle }: SlideProps) => {
  return (
    <Modal transparent animationType="fade" visible={open} onDismiss={onClose}>
      <Pressable
        onPress={onClose}
        className="flex-1 bg-[#1e1e2daa] justify-center items-center"
      >
        <Pressable
          style={popupStyle}
          className="bg-primary gap-1 rounded-lg w-72"
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default Slide;
