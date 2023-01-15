// #region HORIZONTAL_BAES_MAZE
document.querySelector('a#buttonHorizontalBaesMaze').addEventListener('click', function(e){
    var scheme_array = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, -1,
    -1, -1, 123, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 139, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 155, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 171, -1, -1, -1, -1, -1, -1, -1, 179, -1,
    -1, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, -1, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, -1, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, -1, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, -1, 239, -1,
    -1, -1, -1, -1, 245, -1, -1, -1, 249, -1, -1, -1, -1, -1, -1, -1, 257, -1, -1, -1, 261, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 273, -1, -1, -1, 277, -1, -1, -1, -1, 282, -1, -1, -1, -1, 287, -1, 289, -1, -1, -1, 293, -1, -1, -1, -1, -1, 299, -1,
    -1, 302, 303, 304, 305, 306, 307, 308, 309, -1, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, -1,
    -1, 362, -1, -1, -1, -1, 367, -1, -1, -1, 371, -1, -1, -1, 375, -1, -1, -1, -1, 380, -1, -1, 383, -1, -1, -1, 387, -1, -1, -1, 391, -1, -1, -1, -1, -1, -1, -1, 399, -1, -1, -1, -1, -1, -1, -1, 407, -1, -1, -1, -1, -1, -1, -1, 415, -1, -1, -1, -1, -1,
    -1, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, -1,
    -1, 482, -1, -1, -1, -1, 487, -1, 489, -1, -1, -1, 493, -1, -1, -1, -1, -1, -1, 500, -1, -1, -1, -1, 505, -1, -1, -1, 509, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 521, -1, -1, -1, 525, -1, 527, -1, -1, -1, -1, -1, -1, -1, -1, -1, 537, -1, 539, -1,
    -1, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, -1, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 611, -1, -1, -1, -1, -1, -1, -1, -1, 620, -1, -1, -1, -1, -1, -1, 627, -1, -1, -1, -1, -1, 633, -1, -1, -1, -1, -1, -1, -1, -1, -1, 643, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 659, -1,
    -1, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, -1, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, -1,
    -1, 722, -1, -1, -1, -1, -1, -1, 729, -1, -1, -1, 733, -1, -1, -1, -1, -1, -1, 740, -1, -1, -1, -1, 745, -1, -1, -1, 749, -1, -1, -1, 753, -1, -1, -1, -1, -1, -1, -1, 761, -1, -1, -1, 765, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 777, -1, -1, -1,
    -1, 782, 783, 784, 785, 786, 787, 788, 789, -1, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, -1, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, -1,
    -1, -1, -1, -1, -1, -1, 847, -1, -1, -1, 851, -1, -1, -1, 855, -1, -1, -1, -1, -1, -1, -1, 863, -1, -1, -1, -1, -1, -1, -1, 871, -1, -1, -1, 875, -1, -1, -1, 879, -1, -1, -1, -1, -1, -1, -1, 887, -1, -1, -1, -1, -1, -1, -1, 895, -1, -1, -1, 899, -1,
    -1, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, -1,
    -1, 962, -1, -1, 965, -1, 967, -1, -1, -1, -1, -1, -1, -1, -1, -1, 977, -1, -1, -1, 981, -1, -1, -1, -1, -1, -1, -1, -1, 990, -1, -1, 993, -1, -1, -1, 997, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1009, -1, -1, -1, 1013, -1, -1, -1, -1, -1, -1, -1,
    -1, 1022, 1023, 1024, 1025, -1, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, -1, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, -1,
    -1, -1, 1083, -1, -1, -1, -1, -1, -1, -1, -1, 1092, -1, -1, -1, -1, -1, -1, 1099, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1115, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1131, -1, -1, -1, -1, -1, -1, -1, 1139, -1,
    -1, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1150, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, -1,
    -1, 1202, -1, -1, 1205, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1217, -1, -1, -1, 1221, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1233, -1, -1, -1, 1237, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1249, -1, -1, -1, 1253, -1, -1, -1, 1257, -1, -1, -1,
    -1, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1297, 1298, 1299, 1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, -1,
    -1, -1, -1, -1, -1, -1, 1327, -1, -1, -1, -1, -1, -1, -1, 1335, -1, -1, -1, -1, -1, -1, -1, 1343, -1, -1, -1, -1, -1, -1, -1, 1351, -1, -1, -1, -1, -1, -1, -1, 1359, -1, -1, -1, -1, -1, -1, -1, 1367, -1, -1, -1, -1, -1, -1, -1, 1375, -1, -1, -1, 1379, -1,
    -1, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390, -1, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418, 1419, 1420, 1421, 1422, 1423, 1424, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1432, 1433, 1434, 1435, 1436, 1437, 1438, 1439, -1,
    -1, 1442, -1, -1, -1, -1, -1, -1, 1449, -1, -1, -1, 1453, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1465, -1, -1, -1, 1469, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1481, -1, -1, -1, 1485, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1497, -1, -1, -1,
    -1, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1515, 1516, 1517, 1518, 1519, 1520, 1521, 1522, 1523, 1524, 1525, 1526, 1527, 1528, 1529, 1530, 1531, 1532, 1533, 1534, 1535, 1536, 1537, 1538, 1539, 1540, 1541, 1542, 1543, 1544, 1545, 1546, 1547, 1548, 1549, 1550, 1551, 1552, 1553, 1554, 1555, 1556, 1557, 1558, 1559, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1571, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1587, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1603, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1619, -1,
    -1, 1622, 1623, 1624, 1625, 1626, 1627, 1628, 1629, 1630, 1631, 1632, 1633, 1634, 1635, 1636, 1637, 1638, 1639, 1640, 1641, 1642, 1643, 1644, 1645, 1646, 1647, 1648, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, -1,
    -1, 1682, -1, -1, -1, -1, -1, -1, 1689, -1, -1, -1, 1693, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1705, -1, -1, -1, 1709, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1721, -1, -1, -1, 1725, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1737, -1, -1, -1,
    -1, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1758, 1759, 1760, 1761, 1762, 1763, 1764, 1765, 1766, 1767, 1768, 1769, 1770, 1771, 1772, 1773, 1774, 1775, 1776, 1777, 1778, 1779, 1780, 1781, 1782, 1783, 1784, 1785, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, -1,
    -1, -1, -1, -1, -1, -1, 1807, -1, -1, -1, -1, -1, -1, -1, 1815, -1, -1, -1, -1, -1, -1, -1, 1823, -1, -1, -1, -1, -1, -1, -1, 1831, -1, -1, -1, -1, -1, -1, -1, 1839, -1, -1, -1, -1, -1, -1, -1, 1847, -1, -1, -1, -1, -1, -1, -1, 1855, -1, -1, -1, 1859, -1,
    -1, 1862, 1863, 1864, 1865, 1866, 1867, 1868, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, -1,
    -1, 1922, -1, -1, 1925, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1937, -1, -1, -1, 1941, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1953, -1, -1, -1, 1957, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1969, -1, -1, -1, 1973, -1, -1, -1, -1, -1, -1, -1,
    -1, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, -1,
    -1, -1, 2043, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2059, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2075, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2091, -1, -1, -1, -1, -1, -1, -1, 2099, -1,
    -1, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2137, 2138, 2139, 2140, 2141, 2142, 2143, 2144, 2145, 2146, 2147, 2148, 2149, 2150, 2151, 2152, 2153, 2154, 2155, 2156, 2157, 2158, 2159, -1,
    -1, 2162, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 2222, 2223, 2224, -1, 2226, 2227, 2228, -1, 2230, 2231, 2232, -1, 2234, 2235, 2236, -1, 2238, 2239, 2240, -1, 2242, 2243, 2244, -1, 2246, 2247, 2248, -1, 2250, 2251, 2252, -1, 2254, 2255, 2256, -1, 2258, 2259, 2260, -1, 2262, 2263, 2264, -1, 2266, 2267, 2268, -1, 2270, 2271, 2272, -1, 2274, 2275, 2276, -1, 2278, 2279, -1,
    -1, 2282, -1, 2284, 2285, 2286, -1, 2288, 2289, 2290, -1, 2292, 2293, 2294, -1, 2296, 2297, 2298, -1, 2300, 2301, 2302, -1, 2304, 2305, 2306, -1, 2308, 2309, 2310, -1, 2312, 2313, 2314, -1, 2316, 2317, 2318, -1, 2320, 2321, 2322, -1, 2324, 2325, 2326, -1, 2328, 2329, 2330, -1, 2332, 2333, 2334, -1, 2336, 2337, 2338, 2339, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    generateMaze(scheme_array);
})
// #endregion