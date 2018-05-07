import { Student } from './entities'
import { Batche } from './entities/batch'
import { getConnection } from "typeorm";

// students
const students = [
  { fullName: 'Marky Mark', batchNumber: 1, photo: 'https://images-na.ssl-images-amazon.com/images/I/41YGyNNoA0L._BO1,204,203,200_.jpg' },
  { fullName: 'Scottie Gee', batchNumber: 1, photo: 'https://secureimg.stitcher.com/feedimagesplain328/101733.jpg' },
  { fullName: 'Hector the Booty Inspector', batchNumber: 1, photo: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac6937ba4d9ef7f77eebd552e1bfba1e43fee92a_full.jpg' },
  { fullName: 'DJ-T', batchNumber: 1, photo: 'https://www.soundwall.it/app/uploads/2011/05/DjT2.png' },
  { fullName: 'Ashey Ace', batchNumber: 1, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSllqaWNNOtesh8xPvYnwaWIMYhXSRv_srHcnEP0N4Ho07-Uqk5Hw' },
]
// batches
const batches = [
  { nickname: 'The Funky Bunch', startDate: new Date('01-01-1998'), endDate: new Date('02-03-1998'), students: [], }
]


export const seedStudents = async() => {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Student)
    .values(students)
    .execute();
}

export const seedBatches = async () => {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Batche)
    .values(batches)
    .execute();
}
