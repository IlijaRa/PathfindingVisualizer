document.querySelector('a#buttonCentricBaesMaze').addEventListener('click', function(e){
    ClearAll();
    var maze = construct2dArray();
    var scheme_2dArray = [[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, -1],
        [-1, 122, -1, -1, 125, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 150, 151, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 176, -1, -1, 179, -1],
        [-1, 182, -1, -1, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, -1, -1, 239, -1],
        [-1, 242, 243, 244, -1, -1, 247, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 270, 271, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 294, -1, -1, 297, 298, 299, -1],
        [-1, 302, -1, 304, -1, -1, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, -1, -1, 357, -1, 359, -1],
        [-1, 362, -1, 364, 365, 366, -1, -1, 369, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 390, 391, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 412, -1, -1, 415, 416, 417, -1, 419, -1],
        [-1, 422, -1, 424, -1, 426, -1, -1, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, -1, -1, 475, -1, 477, -1, 479, -1],
        [-1, 482, -1, 484, -1, 486, 487, 488, -1, -1, 491, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 510, 511, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 530, -1, -1, 533, 534, 535, -1, 537, -1, 539, -1],
        [-1, 542, -1, 544, -1, 546, -1, 548, -1, -1, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, -1, -1, 593, -1, 595, -1, 597, -1, 599, -1],
        [-1, 602, -1, 604, -1, 606, -1, 608, 609, 610, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 630, 631, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 651, 652, 653, -1, 655, -1, 657, -1, 659, -1],
        [-1, 662, -1, 664, -1, 666, -1, 668, -1, 670, -1, -1, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, -1, -1, 711, -1, 713, -1, 715, -1, 717, -1, 719, -1],
        [-1, 722, -1, 724, -1, 726, -1, 728, -1, 730, -1, 732, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 750, 751, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 769, -1, 771, -1, 773, -1, 775, -1, 777, -1, 779, -1],
        [-1, 782, -1, 784, -1, 786, -1, 788, -1, 790, -1, 792, -1, -1, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, -1, -1, 829, -1, 831, -1, 833, -1, 835, -1, 837, -1, 839, -1],
        [-1, 842, -1, 844, -1, 846, -1, 848, -1, 850, -1, 852, -1, 854, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 870, 871, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 887, -1, 889, -1, 891, -1, 893, -1, 895, -1, 897, -1, 899, -1],
        [-1, 902, -1, 904, -1, 906, -1, 908, -1, 910, -1, 912, -1, 914, -1, -1, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, -1, -1, 947, -1, 949, -1, 951, -1, 953, -1, 955, -1, 957, -1, 959, -1],
        [-1, 962, -1, 964, -1, 966, -1, 968, -1, 970, -1, 972, -1, 974, -1, 976, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 990, 991, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1005, -1, 1007, -1, 1009, -1, 1011, -1, 1013, -1, 1015, -1, 1017, -1, 1019, -1],
        [-1, 1022, -1, 1024, -1, 1026, -1, 1028, -1, 1030, -1, 1032, -1, 1034, -1, 1036, -1, -1, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, -1, -1, 1065, -1, 1067, -1, 1069, -1, 1071, -1, 1073, -1, 1075, -1, 1077, -1, 1079, -1],
        [-1, 1082, -1, 1084, -1, 1086, -1, 1088, -1, 1090, -1, 1092, -1, 1094, -1, 1096, -1, 1098, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1110, 1111, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1123, -1, 1125, -1, 1127, -1, 1129, -1, 1131, -1, 1133, -1, 1135, -1, 1137, -1, 1139, -1],
        [-1, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1150, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, -1],
        [-1, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, -1],
        [-1, 1262, -1, 1264, -1, 1266, -1, 1268, -1, 1270, -1, 1272, -1, 1274, -1, 1276, -1, 1278, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1290, 1291, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1303, -1, 1305, -1, 1307, -1, 1309, -1, 1311, -1, 1313, -1, 1315, -1, 1317, -1, 1319, -1],
        [-1, 1322, -1, 1324, -1, 1326, -1, 1328, -1, 1330, -1, 1332, -1, 1334, -1, 1336, -1, -1, 1339, 1340, 1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359, 1360, 1361, 1362, -1, -1, 1365, -1, 1367, -1, 1369, -1, 1371, -1, 1373, -1, 1375, -1, 1377, -1, 1379, -1],
        [-1, 1382, -1, 1384, -1, 1386, -1, 1388, -1, 1390, -1, 1392, -1, 1394, -1, 1396, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1410, 1411, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1425, -1, 1427, -1, 1429, -1, 1431, -1, 1433, -1, 1435, -1, 1437, -1, 1439, -1],
        [-1, 1442, -1, 1444, -1, 1446, -1, 1448, -1, 1450, -1, 1452, -1, 1454, -1, -1, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465, 1466, 1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475, 1476, 1477, 1478, 1479, 1480, 1481, 1482, 1483, 1484, -1, -1, 1487, -1, 1489, -1, 1491, -1, 1493, -1, 1495, -1, 1497, -1, 1499, -1],
        [-1, 1502, -1, 1504, -1, 1506, -1, 1508, -1, 1510, -1, 1512, -1, 1514, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1530, 1531, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1547, -1, 1549, -1, 1551, -1, 1553, -1, 1555, -1, 1557, -1, 1559, -1],
        [-1, 1562, -1, 1564, -1, 1566, -1, 1568, -1, 1570, -1, 1572, -1, -1, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, -1, -1, 1609, -1, 1611, -1, 1613, -1, 1615, -1, 1617, -1, 1619, -1],
        [-1, 1622, -1, 1624, -1, 1626, -1, 1628, -1, 1630, -1, 1632, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1650, 1651, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1669, -1, 1671, -1, 1673, -1, 1675, -1, 1677, -1, 1679, -1],
        [-1, 1682, -1, 1684, -1, 1686, -1, 1688, -1, 1690, -1, -1, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, -1, -1, 1731, -1, 1733, -1, 1735, -1, 1737, -1, 1739, -1],
        [-1, 1742, -1, 1744, -1, 1746, -1, 1748, 1749, 1750, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1770, 1771, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1791, 1792, 1793, -1, 1795, -1, 1797, -1, 1799, -1],
        [-1, 1802, -1, 1804, -1, 1806, -1, 1808, -1, -1, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1840, 1841, 1842, 1843, 1844, 1845, 1846, 1847, 1848, 1849, 1850, -1, -1, 1853, -1, 1855, -1, 1857, -1, 1859, -1],
        [-1, 1862, -1, 1864, -1, 1866, 1867, 1868, -1, -1, 1871, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1890, 1891, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1910, -1, -1, 1913, 1914, 1915, -1, 1917, -1, 1919, -1],
        [-1, 1922, -1, 1924, -1, 1926, -1, -1, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, -1, -1, 1975, -1, 1977, -1, 1979, -1],
        [-1, 1982, -1, 1984, 1985, 1986, -1, -1, 1989, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2010, 2011, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2032, -1, -1, 2035, 2036, 2037, -1, 2039, -1],
        [-1, 2042, -1, 2044, -1, -1, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, -1, -1, 2097, -1, 2099, -1],
        [-1, 2102, 2103, 2104, -1, -1, 2107, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2130, 2131, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2154, -1, -1, 2157, 2158, 2159, -1],
        [-1, 2162, -1, -1, 2165, 2166, 2167, 2168, 2169, 2170, 2171, 2172, 2173, 2174, 2175, 2176, 2177, 2178, 2179, 2180, 2181, 2182, 2183, 2184, 2185, 2186, 2187, 2188, 2189, 2190, 2191, 2192, 2193, 2194, 2195, 2196, 2197, 2198, 2199, 2200, 2201, 2202, 2203, 2204, 2205, 2206, 2207, 2208, 2209, 2210, 2211, 2212, 2213, 2214, 2215, 2216, -1, -1, 2219, -1],
        [-1, 2222, -1, -1, 2225, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2250, 2251, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2276, -1, -1, 2279, -1],
        [-1, -1, 2283, 2284, 2285, 2286, 2287, 2288, 2289, 2290, 2291, 2292, 2293, 2294, 2295, 2296, 2297, 2298, 2299, 2300, 2301, 2302, 2303, 2304, 2305, 2306, 2307, 2308, 2309, 2310, 2311, 2312, 2313, 2314, 2315, 2316, 2317, 2318, 2319, 2320, 2321, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, 2331, 2332, 2333, 2334, 2335, 2336, 2337, 2338, 2339, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];
    generateMaze(maze, scheme_2dArray);
    generateStartAndGoalNode();
});