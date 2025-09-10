"use client";
import { useWindowDimensions } from "../hooks/useClientOnly";

type Props = {};

export default function GetWidownDimensoins() {
  return useWindowDimensions();
}
