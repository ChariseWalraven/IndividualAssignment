import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsDate } from 'class-validator'
import {Student} from './index'

@Entity()
export class Batche extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  nickname: string

  @IsDate()
  @Column('date')
  startDate: Date

  @IsDate()
  @Column('date')
  endDate: Date

  @OneToMany(_ => Student, student => student.batch)
  @JoinColumn()
  students: Student[]
}