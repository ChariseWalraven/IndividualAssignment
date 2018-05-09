import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Exclude } from "class-transformer";
import { IsEmail, IsString } from 'class-validator'
import * as bcrypt from 'bcrypt'
import {Batche} from './batch'

type Color = 'green' | 'red' | 'yellow'

@Entity()
export class Teacher extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsEmail()
  @Column('text', { nullable: false })
  email: string

  @IsString()
  @Column('text', { nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}

@Entity()
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', { nullable: false })
  fullName: string

  @IsString()
  @Column('text')
  photo: string

  /*
  note: I know that it's TypeORM convention to use 'type', but my linter complains that I'm not using the argument. 
  */
  @OneToMany(_ => Evaluation, evaluation => evaluation.student)
  @JoinColumn()
  evaluations: Evaluation[] 

  @ManyToOne(_ => Batche, batch => batch.students, {eager: true, nullable: false})
  @JoinColumn()
  batch: Batche
}

@Entity()
export class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => Student, student => student.evaluations, { eager: true, nullable: false})
  @JoinColumn()
  student: Student

  @ManyToOne(_ => Batche, batch => batch.evaluations, {eager: true})
  @JoinColumn()
  batch: Batche

  @Column('text')
  remarks: string

  @IsString()
  @Column('text')
  color: Color

  @Column('date')
  date: string

  async getDate(){
    let value = await new Date()
    this.date = value.toLocaleDateString()
  }
} 