'use server'

import mysql from 'mysql2/promise'
import { convertMySQLToPostgres } from './lib/convert'

export interface MySQLConfig {
    host: string
    port: number
    user: string
    password: string
    database: string
}

export async function getDefaultMySQLConfig() {
    return {
        host: process.env.MYSQL_HOST ?? '',
        port: Number(process.env.MYSQL_PORT ?? 3306),
        user: process.env.MYSQL_USER ?? '',
        password: '',                    // 不返回密码
        database: process.env.MYSQL_DATABASE ?? '',
        hasPassword: Boolean(process.env.MYSQL_PASSWORD),
    }
}

export async function testConnection(config: MySQLConfig) {
    try {
        const conn = await mysql.createConnection({
            ...config,
            connectTimeout: 5000,
        })
        await conn.query('SELECT 1')
        await conn.end()
        return { ok: true as const }
    } catch (err) {
        return { ok: false as const, error: (err as Error).message }
    }
}

export async function listTables(config: MySQLConfig) {
    try {
        const conn = await mysql.createConnection(config)
        const [rows] = await conn.query('SHOW TABLES')
        await conn.end()
        const tables = (rows as Record<string, string>[]).map(
            (r) => Object.values(r)[0]
        )
        return { ok: true as const, tables }
    } catch (err) {
        return { ok: false as const, error: (err as Error).message }
    }
}

export async function fetchAndConvert(config: MySQLConfig, tableName: string) {
    try {
        const conn = await mysql.createConnection(config)
        const [rows] = await conn.query('SHOW CREATE TABLE ??', [tableName])
        await conn.end()

        const record = (rows as Record<string, string>[])[0]
        const mysqlDDL = record['Create Table'] ?? Object.values(record)[1]

        const { sql, warnings } = convertMySQLToPostgres(mysqlDDL)

        return { ok: true as const, mysqlDDL, sql, warnings }
    } catch (err) {
        return { ok: false as const, error: (err as Error).message }
    }
}