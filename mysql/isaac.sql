/*
 Navicat Premium Data Transfer

 Source Server         : localhost3306
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : date

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 25/12/2018 19:48:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_table
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `weichatid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `creatTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `identify` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_table
-- ----------------------------
INSERT INTO `admin_table` VALUES ('105817977d2443f5be2147e6e2d19d06', 'zdeai352671', '$2b$10$qny4d3ZyZnVnKuzDxWYkFubSsFUDARUEvEWfi63NiFOEiFX7uAyVy', '1544779571', '2');
INSERT INTO `admin_table` VALUES ('a62e1f8918a24b2ea63a7e0803aa519a', 'zdeai352677', '$2b$10$u1fek4W8wjRjgSn06AdEVeAavjmcEV.bG7VJTAH/0Itqk9muYZpA2', '1544779479', '1');

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `openid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatarUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `creatTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `weichatid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `roleMin` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `roleMax` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dateMin` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dateMax` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sloganStr` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_table
-- ----------------------------
INSERT INTO `user_table` VALUES ('15c1a651008c4b10b0b50811fffdf5f2', 'oBg2Z0a-9debK--ulD2ggMgK0J1o', 'Desiree', 'http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIUDjC3oelg8wJssleJTLtZrsLpeCYvZV6078iad7egvJmapvfjQLUSt7uEXiahJRgszg9uSgaLHXicQ/132', '1', '1545217194', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_table` VALUES ('1aeb851bf2c3402984bec98be0d687fd', 'ogdsY4xL7BcflOHRy3Nheu1FGwvs', '赖丽娜', 'https://wx.qlogo.cn/mmopen/vi_32/jabyoUu9H55h6zJccRwhpWLsyUt44KhN1ULpm8Bveb7dyGlCf5hGdkEuoJQAUUfswMVib1OEY6wIpf7Rd6yL3wg/132', '1', '1545114925', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_table` VALUES ('661448e52da94817bc663ffc04926294', 'ogdsY48SFFnroEZhvG9OnxTTPg1Y', '木头yaya', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2NibkddSUpjdFZGicr7LDCrkdZkg0Cic2nm16HC3t5GNkW6wo2Av8VQbPlAYoQWkiayC9qsMsibwTqZg/132', '1', '1545217611', 'zdeai352677', '0', '0.4', '0.5', '1', '测试一下');
INSERT INTO `user_table` VALUES ('694c3a5620b54d11901d380c8a83b69a', 'ogdsY4wiahRBGCWixhEeUJ4F_1mw', '毛晓杰', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoibBuXQxSoJ9vXhauXiaPXwEs1lcf8U2qYRfz1StrZcD0rXcmhpmZABoEPre6tO7d2ibYde9MtQTicTg/132', '1', '1545114893', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_table` VALUES ('7e9d68a81b6a43759e93684df775bc7a', 'oBg2Z0S4AooGiuM40o2MYiwVBKls', '斯与', 'http://thirdwx.qlogo.cn/mmopen/vi_32/207SGpo7UictSbc96eCdsicPEOEcefWymaWy7OEPfo8M9AFER6jSicn7oRFQSibf4ETM2icYajic4hzgGHFnbnAxyqicA/132', '1', '1545114846', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_table` VALUES ('8340f1dbddc547c2a8ad89e6afd2eae7', 'oBg2Z0bHGE7PHlNYV7mkN6W0phI4', '戴着镣铐跳舞', 'http://thirdwx.qlogo.cn/mmopen/vi_32/jicgtv1vSxiciaFOfFawfe83iavjENrtN7UTPujg6IuFWX6HnCeFhpvXTFzuCnL6SCMQPzJibTRt09DZia3LJxmCypcQ/132', '1', '1545123614', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_table` VALUES ('85e3a20b183145deaea4d3c0aafd7247', 'oBg2Z0YvFVkai4COYfveM14QSTlc', '本颖', 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoCmh47BiaM2AXRYU4Sc8kIu1ANqPPuk25Nj1ic5xib0b8NIRpdjQ9NuiaicLL9UjJFAr3GL0ib9kKAFzCw/132', '1', '1545123657', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_table` VALUES ('a779acafbc864afc88ea29fdd5036236', 'oBg2Z0bc0guDB5tWxOhf3au8wY4Q', 'Tracy Zou', 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJxtUicJoIA9XQakEnn5bcHzMUZraRlFLZL09QDRsR2yuIhrPWfvCDNOpiabV7aMdHHCIiadxDarRudQ/132', '1', '1545114814', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_table` VALUES ('ce17d8477139495db4d060dbbe9f120c', 'oBg2Z0XFXuiv7ahMSfYx3YghhPes', '星辰', 'http://thirdwx.qlogo.cn/mmopen/vi_32/BUcfMPzbCZSMZ4uvcyXkLW60l23Qa36lfv2eEPyYDiaUSWq7BKb89QqKVd3PyXKD4FplO713MtrVJv2HHHUNLDA/132', '1', '1545114694', NULL, NULL, NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
