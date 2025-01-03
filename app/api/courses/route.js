import courses from "./data.json";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json(courses);
}

export async function POST(request) {
  const { title, description, level, link } = await request.json();
  console.log(title, description, level, link);

  const newCourse = {
    id: uuidv4(),
    title,
    description,
    level,
    link,
  };

  courses.push(newCourse);
  return NextResponse.json(courses);
}
