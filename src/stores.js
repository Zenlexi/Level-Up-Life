import { writable } from 'svelte/store';

const storedUser = {
	name: localStorage.username,
	birth: localStorage.birthday,
	totalEXP: localStorage.userEXP
}
const storedDailyEXP = localStorage.dailyEXP;
const storedTodos = localStorage.todos;
const storedBucket = localStorage.bucket;
const initTodos = [
	{
		id: -1,
		description: "brush teeth",
		exp: 2,
		difficulty: "easy",
		done: false,
		due: "2022-03-29",
		freq: "once"
	},
	{
		id: -2,
		description: "eat breakfast",
		exp: 1,
		difficulty: "easy",
		done: false,
		due: "2022-03-22",
		freq: "daily"
	}
]

export const userEXP = writable(storedUser.totalEXP || 0);
export const dailyEXP = writable(storedDailyEXP || 0);
export const userName = writable(storedUser.name || "username");
export const birthday = writable(storedUser.birth || "1950-01-01");
export let todos = writable(JSON.parse(localStorage.getItem('todos')) === null ? initTodos : JSON.parse(localStorage.getItem('todos')));
export let bucket = writable(JSON.parse(localStorage.getItem('bucket')) === null ? initTodos : JSON.parse(localStorage.getItem('bucket')));

userName.subscribe((value) => localStorage.username = value);
birthday.subscribe((value) => localStorage.birthday = value);
userEXP.subscribe((value) => localStorage.userEXP = value);
todos.subscribe((value) => {localStorage.setItem("todos", JSON.stringify(value))});
bucket.subscribe((value) => {localStorage.setItem("bucket", JSON.stringify(value))});
